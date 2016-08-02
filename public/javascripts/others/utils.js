'use strict';
/*!
 * softechUtil (Utilities library)
 *
 *
 * Created by Julio Nuñez Quesada
 * Released under the MIT license
 *
 */
(function(softechUtil, $, undefined){

  // Validate if an object is empty
  softechUtil.validateEmptyData = function( item ){
    let result = item;
    if(typeof item === 'undefined' || item === null || item === '' || item === {}){
          return '';
      }
      return result;
  };

  // Validate if an object is empty and number
  softechUtil.validateDataNumber = function( item ){
    let result = item;
    if(isNaN(item)){
        return 0;
      }
      return result;
  };

})(window.softechUtil = window.softechUtil || {}, jQuery);
