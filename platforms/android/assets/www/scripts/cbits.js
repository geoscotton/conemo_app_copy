$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

var cbits = {};

cbits.getDaysInTreatment = function(){

     //Get current time zeroed date for comparison with start
        var dateToday = new Date();
        dateToday.setHours(0,0,0,0);

        var dateDiff = function (dateEarlier, dateLater) {
            var oneDay=1000*60*60*24
            return (  Math.round((dateLater.getTime()-dateEarlier.getTime())/oneDay)  );
        }

        return dateDiff(startDate,dateToday)+1;


}
