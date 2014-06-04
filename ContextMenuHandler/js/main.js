var ContextMenuHandler = function ($) {

  return {
    /*
    * @contextMenu: Context menu to be used
    * @clickable: Clickable section inside the area which trigger the context menu.
    * @area: Area of interest. Optional. Default body.
    */
    init: function(contextMenu, clickable, area) {
      
      if(clickable === undefined || clickable.length === 0) {
        alert('Context menu plugin is not correctly initialized');
        return;
      }
      
      area = (area === undefined || area.length === 0) ? 'body' : area;
      
      var $contextMenu = $(contextMenu);

      $(area).on("contextmenu", clickable, function(e) {
        $contextMenu.css({
          display: "block",
          left: e.pageX,
          top: e.pageY
        });
        
        return false;
      });
      
      $contextMenu.on("click", "a", function() {
        var func = $(this).attr('data-function'), args = $(this).attr('data-args') === undefined ? [] : $(this).attr('data-args').split(',');
        if(func !== undefined) {
          executeFunctionByName(func, window, args);
        }
        
        $contextMenu.hide();
        
        function executeFunctionByName(functionName, context /*, args */) {
          var args = [].slice.call(arguments).splice(2);
          var namespaces = functionName.split(".");
          var func = namespaces.pop();
          for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
          }
          return context[func].apply(this, args);
        }
      });
      
      $(document).click(function(event) {
        if(!$(event.target).closest(contextMenu).length) {
          if($(contextMenu).is(":visible")) {
            $(contextMenu).hide();
          }
        }
      });
      
    }
  };
  
}(jQuery);


