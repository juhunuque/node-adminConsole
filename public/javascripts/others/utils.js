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

  // Compare two arrays and find duplicates, then returns an array without duplicate items
  softechUtil.getArrayWithoutDuplicates = function( Array2, Array1 ){
    Array1 = Array1.filter(function(val) {
      return Array2.indexOf(val) == -1;
    });
    return Array1;
  };

})(window.softechUtil = window.softechUtil || {}, jQuery);
