$.fn.cascade = function(setting){
	var defaults = {"column":"4","margin":"3"};
	var self = this;
	var items = []; 
	var containers = [];
	var position = 0;
	this.option = {
		getAllItem : function(){
			var t = self.find(setting.item);
			for (var i=0;i<t.length;i++) {
				items[i] = t.get(i);
		    }
		},
		getAllContainer : function(){
			if(!setting.width){
				setting.width = Math.floor(self.width()/setting.column)-2*setting.margin;
			} 
			for (var i=0;i<setting.column;i++) {
				containers[i] = $("<div style='margin-left:"+setting.margin+"px;float:left;width:"+setting.width+"px'></div>").appendTo(self);
			}
		},
		setposition : function(){
			var cno = containers.length;
			for(i in items){
				var j = i % cno;
				$(containers[j]).append($(items[i]));
			}
			position = j;
			self.css({'height':'auto','overflow':'auto'});
		},
		append : function(obj){
			++position;
			if(position>3){
				position=0;
			}
			$(containers[position]).append(obj);
		},
		__init__:function(){
			setting = $.extend( {}, defaults, setting); 
			this.getAllItem();
			this.getAllContainer(); 
			return this;
		}
	}
	this.option.__init__().setposition();
	this.append = this.option.append;
	return this;
}  