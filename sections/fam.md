<section class="title-slide" markdown="1">

>
>

## A Bayesian Feature Allocation Model for Identifying Cell Subpopulations Using Cytometry Data

---

</section>

<section markdown="1">

# Cytometry at time-of-flight (CyTOF)

- Commercialized in 2009

- Makes use of time-of-flight spectrometry to accelerate, separate,
  and identify ions by mass

- Enables detection of many parameters (biological, phenotypic, or
  functional markers) in less time and at a higher resolution <param
  citep="cheung2011screening">

- Led to greater understanding of natural killer (NK) cells

</section>

<section markdown="1">
# Natural Killer Cells

- Natural Killer cells play a critical role in cancer
      immunosurveillance.

- NK cell diversity affects antiviral response.

- Drs. Thall and Rezvani, at MD Anderson Cancer Center, have
      conducted clinical trials to study the potential clinical efficacy of
      umbilical cord blood (UCB) transplantation as a therapy for leukemia.

- UCB NK cell therapy has the advantage of low risk of viral
      transmission from donor to recipient <param citep="sarvaria2017umbilical">.

- In the trials, leukemia patients received UCB cell transplants,
      and NK cell surface markers are measured using mass cytometry.
</section>

<section>
  <h1> CyTOF Data </h1>
  <a href="https://docs.google.com/spreadsheets/d/1_eJHC6sx0NcCIs79hbd6cgyk9Xm03Y_binlRg__ET5E/edit#gid=0">
  <figure class="center" style="width:75%">
    <img src="assets/img/fam/fam-table1.svg" style="width:100%">
    <figcaption>Table 1: Cord-blood sample marker expression levels for 6 of 32
      NK-cell markers (columns), and 6 of 41474 cells (rows). Last row
      contains cutoff values returned by CyTOF instrument.</figcaption>
  </figure>
  </a>

<div markdown="1">

- Data missing not at random
    - Some markers contain up to 85% missing values
>
- Cutoff values are computed after measurement

</div>
</section>

<section>
  <h1> CyTOF Data </h1>
  <a href="https://docs.google.com/spreadsheets/d/1_eJHC6sx0NcCIs79hbd6cgyk9Xm03Y_binlRg__ET5E/edit#gid=76258114">
  <figure class="center" style="width:75%">
    <img src="assets/img/fam/fam-table2.svg" style="width:100%">
    <figcaption>Table 2: Cell subpopulations (rows). </figcaption>
  </figure>
  </a>
  <p>
     Obtaining cell subpopulations using overly-simplistic may yield an
     unreasonably high number of subpopulations.
  </p>
</section>

<section>
  <h1> Objective </h1>
  <figure class="center" style="width:75%">
    <img src="assets/img/fam/fam-overview-cleaner.png" style="width:100%">
    <figcaption>
      Figure 1: Given marker expression samples, identify potential latent
      NK cell subpopulations and their abundances in each sample. Note
      the pervasiveness of missing data (black cells).
    </figcaption>
  </figure>
</section>

<section markdown="1">
# Existing Methods
<br>

- Most existing methods use traditional clustering methods
  (K-means, hierarchical clustering, density-based clustering, nearest-neighbor
  clustering, etc.)

- For high-dimensional cytometry data, <param cite="weber2016comparison">
  compared existing clustering methods including *FlowSOM* <param
  citep="van2015flowsom">, *PhenoGraph* <param citep='levine2015data'>,
  *Rclusterpp* <param cite='linderman2013package'>, and *flowClust* <param
  cite='lo2009flowclust'>.

- Existing methods do not directly model latent subpopulations
or quantify model uncertainty
</section>

<section markdown="1">
# Bayesian Feature Allocation Model for Heterogeneous Cell Populations -- Notation
- $I$: Number of samples
- $J$: Number of markers
- $N_i$: Number of observations in sample $i$. 
- $y_{i,n,j}$: Raw expression levels for observation&nbsp;$n$, in samples&nbsp;$i$,
  for marker $j$. (For $ỹ_{i,n,j} \ge 0$)
- $c_{i,j}$: Cutoff for marker&nbsp;$j$, sample&nbsp;$i$
- $y_{i,n,j}$: Transformed expression levels for observation&nbsp;$n$, sample&nbsp;$i$,
  marker&nbsp;$j$
> $$y_{i,n,j}=\log(\tilde{y}_{i,n,j}/c_{i,j}) \in \mathbb{R}.$$
    - $(y_{i,n,j} \gg 0)$ likely corresponds to expression
    - $(y_{i,n,j} \ll 0)$ likely corresponds to non-expression
</section>

<section markdown="1">
# Bayesian Feature Allocation Model for Heterogeneous Cell Populations

- $\bm Z$: $(J \times K)$ binary matrix defining the latent subpopulations.
    - if $Z_{j,k} = 1$, then marker $j$ is expressed in subpopulation $k$
    - if $Z_{j,k} = 0$, then marker $j$ is not expressed in subpopulation $k$

- $K$ is a sufficiently large constant

- $\lambda_{i,n} \in \\{1,...,K\\}$: The latent subpopulation of observation
  $n$, sample $i$
</section>

<!-- TODO: implement a pause?
\begin{frame}{Sampling Distribution}
  \begin{align*}
    y_{inj} \mid \bm\eta_{ij}, \bm\mu^\star, \sigma^2_i,
    \bm Z, \lambda_{i,n}=k \ind
    \begin{cases}
      F_{0ij}, &\mbox{if $z_{j,k}=0$},\\
      F_{1ij}, &\mbox{if $z_{j,k}=1$}.\\
    \end{cases} \label{eq:y-mix}
  \end{align*}
  \pause
  %
  \begin{itemize}
    \item $F_{0ij} = \sum_{\ell=1}^{L^0} \eta^0_{ij\ell}\cdot
      \text{Normal}\p{\mu^\star_{0\ell}, \sigma^2_i}$,
      where $\mu^\star_{0\ell} < 0$
    \item $F_{1ij} = \sum_{\ell=1}^{L^1} \eta^1_{ij\ell}\cdot
      \text{Normal}\p{\mu^\star_{1\ell}, \sigma^2_i}$,
      where $\mu^\star_{1\ell} > 0$
  %\item
  %  Fixed number of mixture components \(L^0\) and \(L^1\)
  %\item
  %  Mixture weights \(\bet^0_{ij}\) and \(\bet^1_{ij}\) where
  %  \(\sum_{\ell=1}^{L^0} \eta^0_{ij\ell}=\sum_{\ell=1}^{L^1}\eta^1_{ij\ell}=1\),
  %  and \(\eta^0_{ij\ell}, \eta^1_{ij\ell} > 0\)
  \end{itemize}
  %
  \begin{figure}
    \begin{center}
      \includegraphics[scale=.2]{img/fam/custom/mixture.pdf}
      \caption{Kernel density estimate of samples from $F_0$ (blue) and $F_1$ (red)}
    \end{center}
  \end{figure}
\end{frame}
-->
