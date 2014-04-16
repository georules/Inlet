Inlet = (function() {
  function inlet(ed, options) {

    var editor = ed;
    var slider;
    var picker;

    if(!options) options = {};
    if(!options.picker) options.picker = {};
    if(!options.slider) options.slider = {};
    var container = options.container || document.body;

    // TODO: document/consider renaming
    var topOffset = options.picker.topOffset || 220;
    var bottomOffset = options.picker.bottomOffset || 16;
    var topBoundary = options.picker.topBoundary || 250;
    var leftOffset = options.picker.leftOffset || 75;
    var y_offset = options.slider.yOffset || 15;

    var wrapper = editor.getWrapperElement();
    wrapper.addEventListener("mousedown", onClick);
    //wrapper.addEventListener("keydown", onKeyDown);
    editor.setOption("onKeyEvent", onKeyDown);

    //make the slider
    var sliderDiv = document.createElement("div");
    sliderDiv.className = "inlet_slider scrub";
    //some styles are necessary for behavior
    sliderDiv.style.visibility = "hidden";
    sliderDiv.style.position = "absolute";
    sliderDiv.style.top = 0;
    container.appendChild(sliderDiv);
    //TODO: figure out how to capture key events when slider has focus
    //sliderDiv.addEventListener("keydown", onKeyDown);

    /*var slider = document.createElement("input");
    slider.className = "range";
    slider.setAttribute("type", "range");*/
    //sliderDiv.addEventListener("mousedown", onSlide);
    
    //slider.style.width = "inherit";
    //sliderDiv.appendChild(slider);
    
    deltaForNumber = function(n) {
    var firstSig, lastDigit, s, specificity;
    if (n === 0) {
      return 1;
    }
    if (n === 1) {
      return 0.1;
    }
    lastDigit = function(n) {
      return Math.round((n / 10 - Math.floor(n / 10)) * 10);
    };
    firstSig = function(n) {
      var i;
      n = Math.abs(n);
      i = 0;
      while (lastDigit(n) === 0) {
        i++;
        n /= 10;
      }
      return i;
    };
    specificity = function(n) {
      var abs, fraction, s;
      s = 0;
      while (true) {
        abs = Math.abs(n);
        fraction = abs - Math.floor(abs);
        if (fraction < 0.000001) {
          return s;
        }
        s++;
        n = n * 10;
      }
    };
    s = specificity(n);
    if (s > 0) {
      return Math.pow(10, -s);
    } else {
      n = Math.abs(n);
      return Math.pow(10, Math.max(0, firstSig(n) - 1));
    }
  };



    function onSlide(event) {
      event.preventDefault();
      mx = event.pageX;
      
      var cursor = editor.getCursor(true);
      var number = getMatch(cursor,'number');
      if(!number) return;
        
      var numValue = Number(number.string).valueOf();
      console.log(numValue);
      delta = deltaForNumber(numValue);
      console.log(delta);
           
      onSlideMouseUp = function(event) {
          window.removeEventListener("mousemove",moved);
          sliderDiv.style.visibility = "hidden";
      };
        
      moved = function(event) {
          event.preventDefault();
          var cursor = editor.getCursor(true);
          var number = getMatch(cursor,'number');
          if(!number) {
              onSlideMouseUp();
              return;
          }
          var d = Number((Math.round((event.pageX - mx) / 2) * delta + numValue).toFixed(5));
          var start = {"line":cursor.line, "ch":number.start};
          var end = {"line":cursor.line, "ch":number.end};
          console.log(d)
          editor.replaceRange(String(d), start, end);
      };
        
      window.addEventListener("mouseup", onSlideMouseUp);
      window.addEventListener('mousemove', moved);
        

    }

    

    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;
    function onKeyDown() {
      if(arguments.length == 1) {
        event = arguments[0]
      } else {
        event = arguments[1];
      }
      //if left or right arrows, we can step through the slider
      //disable the slider + picker on key event
      if(event.keyCode == LEFT || event.keyCode == DOWN) {
        //LEFT
        if(sliderDiv.style.visibility === "visible") {
          slider.stepDown(1);
          onSlide();
          return true;
        } else if(event.altKey) {
          onClick();
        } else {
        }
      } else if(event.keyCode == RIGHT || event.keyCode == UP) {
        //RIGHT
        if(sliderDiv.style.visibility === "visible") {
          slider.stepUp(1);
          onSlide();
          return true;
        } else if(event.altKey) {
          onClick();
        } else {
        }
      } else {
        sliderDiv.style.visibility = "hidden";
      }
    }

    var pickerCallback = function(color, type) {
        //set the cursor to desired location
        var cursor = editor.getCursor();
        // we need to re-match in case the size of the string changes
        if (!type) return;
        var match = getMatch(cursor, type);
        var start = {"line":cursor.line, "ch":match.start};
        var end = {"line":cursor.line, "ch":match.end};
        editor.replaceRange(color, start, end);
    }
    // this will be overwritten if hslMatch hits
    // so that the "old color view" will initilize correctly
    picker = new thistle.Picker("#ffffff")
    // setup colorpicker position

    //Handle clicks
    function onClick(ev) {
      var cursor = editor.getCursor(true);
      var token = editor.getTokenAt(cursor);
      cursorOffset = editor.cursorCoords(true, "page");

      // see if there is a match on the cursor click
      var numberMatch = getMatch(cursor, 'number');
      var hslMatch = getMatch(cursor, 'hsl');
      var hexMatch = getMatch(cursor, 'hex');
      var rgbMatch = getMatch(cursor, 'rgb');

      var pickerTop = (cursorOffset.top - topOffset);
      if (cursorOffset.top < topBoundary) {pickerTop = (cursorOffset.top + bottomOffset)}
      var pickerLeft = cursorOffset.left - leftOffset;
      
      sliderDiv.style.visibility = "hidden";

      if(hexMatch) {
        var color = hexMatch.string;
        // reconstructing the picker so that the previous color 
        // element shows the color clicked
        picker = new thistle.Picker(color)
        picker.setCSS(color) // current color selection
        picker.presentModal(pickerLeft,pickerTop)
        picker.on('changed',function() {
          picked = picker.getCSS()
          //translate hsl return to hex
          picked = Color.Space(picked, "W3>HSL>RGB>HEX24>W3");
          pickerCallback(picked,'hex')
        })
      } else if (hslMatch) {
        var color = hslMatch.string;
        picker = new thistle.Picker(color)
        picker.setCSS(color)
        picker.presentModal(pickerLeft,pickerTop)
        picker.on('changed',function() {
          picked = picker.getCSS()
          pickerCallback(picked,'hsl')
        })
      } else if(rgbMatch) {
        var color = rgbMatch.string;
        picker = new thistle.Picker(color)
        picker.setCSS(color) // current color selection
        picker.presentModal(pickerLeft,pickerTop)
        picker.on('changed',function() {
          picked = picker.getCSS()
          //translate hsl return to rgb
          picked = Color.Space(picked, "W3>HSL>RGB>W3");
          pickerCallback(picked,'rgb')
        })
      } else if(numberMatch) {

        var len = numberMatch.string.length;

        //setup slider position
        // position slider centered above the cursor
        var sliderTop = cursorOffset.top - y_offset;

        var sliderWidth = (len*16);
          
        var sliderLeft = cursorOffset.left - sliderWidth/2;
        sliderDiv.style.top = sliderTop + 10 + "px";
        sliderDiv.style.left = sliderLeft + "px";
        sliderDiv.style.width = sliderWidth + "px";
        ev.preventDefault();
        sliderDiv.style.visibility = "visible";
        onSlide(ev);
          
      } else {

      }
    }
    
    function getSliderRange(value) {
      //this could be substituted out for other heuristics
      var range, step, sliderMin, sliderMax;
      //these values were chosen by Gabriel Florit for his livecoding project, they work really well!
      if (value === 0) { 
        range = [-100, 100];
      } else {
        range = [-value * 3, value * 5];
      }
      if(range[0] < range[1]) {
        min = range[0];
        max = range[1];
      } else {
        min = range[1];
        max = range[0];
      }
      // slider range needs to be evenly divisible by the step
      if ((max - min) > 20) {
        step = 1;
      } else {
        step = (max - min) / 200;
      }
      return {
        min: min,
        max: max,
        step: step
      }
    }
    
    function getMatch(cursor, type) {
      if (!type) return;
      var re;
      switch(type.toLowerCase()) {
        case 'hsl':
          re = /hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)/g;
          break;

        case 'rgb':
          re = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
          break;

        case 'hex':
          re = /#[a-fA-F0-9]{3,6}/g;
          break;

        case 'number':
          re = /[-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
          break;

        default:
          throw new Error("invalid match selection");
          return;
      }
      var line = editor.getLine(cursor.line);
      var match = re.exec(line);
      while(match) {
        var val = match[0];
        var len = val.length;
        var start = match.index;
        var end = match.index + len;
        if(cursor.ch >= start && cursor.ch <= end) {
          match = null;
          return {
            start: start,
            end: end,
            string: val
          };
        }
        match = re.exec(line);
      }
      return;
    }

  }
    
  function getPixels(style) {
    var pix = 0;
    if(style.length > 2 ) {
      pix = parseFloat(style.slice(0, style.length-2));
    }
    if(!pix) pix = 0;
    return pix;
  } 
  function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
  
  

  return inlet;

})();
