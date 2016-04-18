$(document).ready(function(){
 $(".block").click(function(){
	         
             if(time>0){
			 var name=$(this).attr("class");
			 if(name.indexOf("bgdishu")>0){
				 removeds();
				
				score++;
				}
			 else{
				 score--;
				 }
			 $("#score").text(score);}
          });
});

   var score = 0;
   var time = 0;
    function timedCount(){
         var num = Math.floor(Math.random()*10);
   		  $("#"+num).removeClass("bgkeng");
		  $("#"+num).addClass("bgdishu");     
		time++;	
		if(time<10)
		{t = setTimeout("timedCount()",1000);}
		 else if(time<20&time>=10)
		{t = setTimeout("timedCount()",800);}
		else if(time<35&time>=20)
		{t = setTimeout("timedCount()",600);}
		else if(time<55&time>=35)
		{t = setTimeout("timedCount()",400);}
		else if(time<75&time>=55)
		{t = setTimeout("timedCount()",200);}
		else
		{t = setTimeout("timedCount()",100);}
        var dishunum = $(".bgdishu").length;
        if(dishunum>=9){alert("得分："+score+"\n\n游戏结束！");
           window.location.reload();}
    }
    function removeds(){
		$(this).removeClass("bgdishu");
		$(this).addClass("bgkeng");
	}
	function initArray(){
		var dsArray = new Array();
	}
	function judgeRepeat(){
		
	}

