    var Num;//雷数
    var lastNum;//剩余雷数
    var array=new Array();//数组
    var is_open=new Array();//该位置是否打开  0:未被点击 1：点击不是雷 2：标记为雷 3：标记为？
    var xNum;//横排个数
    var yNum;//竖排个数
    var timer;
    var time=0;
    var re=0;//游戏布局是否和上一次相同  0为不同，1为相同
    var flag1=0;
    var flag2=0;
    function show_initPage(x,y,num){
        var sum=0;
        for(var m=0;m<xNum;m++){
            for(var n=0;n<yNum;n++){
                if(is_open[m][n]==0)
                    sum+=1;
            }}
        if(sum!=0&&re==0)
        {
           if(!confirm("确定开始新游戏？"))
           return false;
        }
        re=0;
        Num=num;
        lastNum=num;
        xNum=x;
        yNum=y;
        time=0;
        clearInterval(timer);
        $("#number").find("span").text(Num);
        $("#time").find("span").text("0");
       $(".cell").remove();
        for(var i=0;i<x;i++){
             array[i]=new Array();
            is_open[i]=new Array();
            for(var j=0;j<y;j++){
                $("#main").append( '<div class="cell" id="cell-'+i+'-'+j+'" onmousedown="mousedown('+i+','+j+',event)" onmouseup="mouseup('+i+','+j+',event)" oncontextmenu ="return false" ></div>' );       // onclick="cell_lclick('+i+','+j+')" oncontextmenu ="cell_rclick('+i+','+j+');return false"
                $("#main").css({
                    width:30*yNum,
                    height:30*xNum
                })
                $("#cell-"+i+"-"+j).animate({
                    width:"30px",
                    height:"30px",
                    top:getPosTop( i , j ),
                    left:getPosLeft( i , j )
                },1000);
                $("#cell-"+i+"-"+j).css({backgroundColor:"#abcdef"});
                $("#cell-"+i+"-"+j).text("");
                array[i][j]=0;
                is_open[i][j]=0;
            }
        }
    }
        function mousedown(i,j,e){
            if(e.button==0 ){
                flag1=1;
                //console.log("按左键") ;
            }
            if(e.button==2 ){
                flag2=1;
                //console.log("按右键") ;
            }
            if(flag1==1&&flag2==1)
            {
                flag1=flag2=2;
                 if(is_open[i][j]==0||is_open[i][j]==3){
                     $("#cell-"+i+"-"+j).css({backgroundColor:bg_color(0)});
                     show_bg(i,j,0) ;

                 }
                if(is_open[i][j]==2||is_open[i][j]==1){
                    show_bg(i,j,0) ;
                }

               // console.log("双键") ;
            }


        }
    function mouseup(i,j,e){
        if(e.button==0 ){
            if(flag1==1&&flag2==0)  {
                //console.log("左击") ;
                cell_lclick(i,j) ; }
            if(flag1==2)  {
               // console.log("双击") ;
                if(is_open[i][j]==0||is_open[i][j]==3||is_open[i][j]==2){
                    if(is_open[i][j]==0||is_open[i][j]==3)  {
                    $("#cell-"+i+"-"+j).css({backgroundColor:"#abcdef"});}
                    show_bg(i,j,-2) ;
                }
                if(is_open[i][j]==1){
                    if(flag_count(i,j)==array[i][j]){
                        if(i>0&&j>0&&(is_open[i-1][j-1]==0||is_open[i-1][j-1]==3)) open(i-1,j-1);
                        if(j>0&&(is_open[i][j-1]==0||is_open[i][j-1]==3))open(i,j-1);
                        if(i<xNum-1&&j>0&&(is_open[i+1][j-1]==0||is_open[i+1][j-1]==3))open(i+1,j-1);
                        if(i>0&&(is_open[i-1][j]==0||is_open[i-1][j]==3))open(i-1,j);
                        if(i<xNum-1&&(is_open[i+1][j]==0||is_open[i+1][j]==3))open(i+1,j);
                        if(i>0&&j<yNum-1&&(is_open[i-1][j+1]==0||is_open[i-1][j+1]==3))open(i-1,j+1);
                        if(j<yNum-1&&(is_open[i][j+1]==0||is_open[i][j+1]==3))open(i,j+1);
                        if(i<xNum-1&&j<yNum-1&&(is_open[i+1][j+1]==0||is_open[i+1][j+1]==3))open(i+1,j+1);
                    }
                    else
                    show_bg(i,j,-2);
                }
            }
            flag1=0;
            flag2=0;

        }
        if(e.button==2 ){
            if(flag1==0&&flag2==1)  {
                //console.log("右击") ;
                cell_rclick(i,j) ; }
            if(flag1==2)  {
               // console.log("双击") ;
                if(is_open[i][j]==0||is_open[i][j]==3||is_open[i][j]==2){
                    if(is_open[i][j]==0||is_open[i][j]==3)  {
                        $("#cell-"+i+"-"+j).css({backgroundColor:"#abcdef"});}
                    show_bg(i,j,-2) ;
                }
                if(is_open[i][j]==1){
                    if(flag_count(i,j)==array[i][j]){
                        if(i>0&&j>0&&(is_open[i-1][j-1]==0||is_open[i-1][j-1]==3)) open(i-1,j-1);
                        if(j>0&&(is_open[i][j-1]==0||is_open[i][j-1]==3))open(i,j-1);
                        if(i<xNum-1&&j>0&&(is_open[i+1][j-1]==0||is_open[i+1][j-1]==3))open(i+1,j-1);
                        if(i>0&&(is_open[i-1][j]==0||is_open[i-1][j]==3))open(i-1,j);
                        if(i<xNum-1&&(is_open[i+1][j]==0||is_open[i+1][j]==3))open(i+1,j);
                        if(i>0&&j<yNum-1&&(is_open[i-1][j+1]==0||is_open[i-1][j+1]==3))open(i-1,j+1);
                        if(j<yNum-1&&(is_open[i][j+1]==0||is_open[i][j+1]==3))open(i,j+1);
                        if(i<xNum-1&&j<yNum-1&&(is_open[i+1][j+1]==0||is_open[i+1][j+1]==3))open(i+1,j+1);
                    }
                    else
                        show_bg(i,j,-2);  }
            }
            flag1=0;
            flag2=0;

        }

    }
    function cell_lclick(i,j){
          if(Is_firstclick()&&re==0){
              init_lei(i,j);//初始化雷
              open(i,j);
              timer=setInterval(function(){
                  time+=1;
                  $("#time").find("span").text(time);
              },1000);
          }
        else{
              var sum=0;
              for(var m=0;m<xNum;m++){
                  for(var n=0;n<yNum;n++){
                      if(is_open[m][n]!=0)
                      sum+=1;
                  }}
              if(sum==0)
              {
                  timer=setInterval(function(){
                      time+=1;
                      $("#time").find("span").text(time);
                  },1000);
              }
              if(is_open[i][j]!=1&&is_open[i][j]!=2) {
              open(i,j);
              }
          }

    }
   function cell_rclick(i,j){
       if(is_open[i][j]==0){
           $("#cell-"+i+"-"+j).removeClass("wenhao").addClass("flag");
       is_open[i][j]=2;
           lastNum-=1;
           $("#number").find("span").text(lastNum);
       }
      else  if(is_open[i][j]==2){
           $("#cell-"+i+"-"+j).removeClass("flag").addClass("wenhao");
           is_open[i][j]=3;
           lastNum+=1;
           $("#number").find("span").text(lastNum);
       }
       else if(is_open[i][j]==3){
           $("#cell-"+i+"-"+j).removeClass("flag").removeClass("wenhao");
           $("#cell-"+i+"-"+j).css({backgroundColor:"#abcdef"});
           is_open[i][j]=0;
       }
       if(is_gameover(i,j,1)==1)
       { fail();}
       else  if(is_gameover(i,j,1)==2)
       {success(); }

   }
    function regame(k){
        lastNum=Num;
        time=0;
        clearInterval(timer);
        $("#number").find("span").text(Num);
        $("#time").find("span").text("0");
        re=1;
        if(k==1) //重玩
        {
            $('#remind').remove();
            $("#fail").css({display:"none"});
            $(".cell").remove();
            for(var i=0;i<xNum;i++){
                for(var j=0;j<yNum;j++){
                    $("#main").append( '<div class="cell" id="cell-'+i+'-'+j+'" onclick="cell_lclick('+i+','+j+')" oncontextmenu ="cell_rclick('+i+','+j+');return false"></div>' );
                    $("#cell-"+i+"-"+j).animate({
                        width:"30px",
                        height:"30px",
                        top:getPosTop( i , j ),
                        left:getPosLeft( i , j )
                    },1000);
                    $("#cell-"+i+"-"+j).css({backgroundColor:"#abcdef"});
                    $("#cell-"+i+"-"+j).text("");
                    is_open[i][j]=0;
                }
            }
            $("#main").append( '<div id="remind">地雷位置与上一次游戏相同，小心！第一次点击就可能会输</div>' );
            $("#remind").css({
                top:30*yNum+10
            })
            setTimeout(" $('#remind').remove();",5000);
        }
        if(k==2)  //新一局
        {
            $("#fail").css({display:"none"});
            $("#success").css({display:"none"});
        show_initPage(xNum,yNum,Num);   }
    }


    $(".select").mousedown(function(e){
        var x=e.offsetX;
        var y=e.offsetY;
        $(document).mousemove(function(e){
            var left=e.pageX-x;
            var top=e.pageY-y;
            $(".select").css({left:left+"px"});
            $(".select").css({top:top+"px"});
        });
        e.preventDefault();
        $(this).mousemove(function(e){
            if(!window.event){return};
            window.event.returnValue=false
        })
    });
    $(document).mouseup(function(e){
        $(document).unbind("mousemove")
    });