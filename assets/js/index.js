import 'https://code.jquery.com/jquery-3.5.1.min.js'
import { setUrlParam, handleDirection, Slider } from './pager.js'
import './citefrombib.min.js'
import "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"
import "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js"
import './disqus.js'

// Initialize the slider. If an id is provided, then use that as starting page.
const initPageIdGetter = window.location.href.split('#')
const firstPage = initPageIdGetter.length > 1 ? initPageIdGetter[1]*1 : 1
const slider = new Slider(firstPage)

// This handles slide navigation.
$(document).on("keydown", function (e) {
  console.log("handling keydown")
  handleDirection(e, slider)
});

$(".left-panel").click(() => {
  console.log("clicked toward left!")
  slider.decrement()
  setUrlParam(slider)
})

$(".right-panel").click(() => {
  console.log("clicked toward right!")
  slider.increment()
  setUrlParam(slider)
})

// citefrombib
citefrombib.make()

// KaTeX
renderMathInElement(document.body)
$(document).ready(function () { // this need jquery
  renderMathInElement(document.body, {
    // ...options...
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\[", right: "\\]", display: true }
    ]
  });
});

// export handleDirection
