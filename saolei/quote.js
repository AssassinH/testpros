

function Is_firstclick(){    //判断是否第一次点击
    var sum=0;
      for(var i=0;i<xNum;i++)
     {
     for(var j=0;j<yNum;j++)  {
     if(array[i][j]!=0){
     sum=sum+1;
     }
     }
     }
     if(sum==0){
     return true;
     }
     else{
     return false;
     }
}
function init_lei(i,j){
    var number=lastNum;
    while(number>0) {
    ranX=Math.floor(Math.random()*(xNum-1));
    ranY=Math.floor(Math.random()*(yNum-1));
        if(!(ranX==i-1&&(ranY==j||ranY==j-1||ranY==j+1))&&!(ranX==i&&(ranY==j||ranY==j-1||ranY==j+1))&&!(ranX==i+1&&(ranY==j||ranY==j-1||ranY==j+1))&&array[ranX][ranY]!=-1){
            array[ranX][ranY]=-1;
            number--;
        }
    }
}
function open(i,j){
    if(is_open[i][j]!=2)
    {
    is_open[i][j]=1; }
    if(array[i][j]==-1){
        show_number(i,j,array[i][j]);
    }
    else{
        array[i][j] ==lei_count(i,j);
    show_number(i,j,array[i][j]) ;}
    if(is_gameover(i,j,0)==1)
    { fail(i,j);}
    if(is_gameover(i,j,0)==2)
    {success(); }
}



function is_gameover(i,j,a){   //a=0点击左键，a=1点击右键
    if(a==0) {
          if(array[i][j]==-1) {
              clearInterval(timer);
          return 1; } }//点到雷失败
    var sum=0;
    var onumber=0;
      for(var m=0;m<xNum;m++)
          for(var n=0;n<yNum;n++)
           {

              if(is_open[m][n]==1||is_open[m][n]==2)//判断已点击个数
              sum+=1;
               if(is_open[m][n]==2&&array[m][n]==-1)//判断已找出雷的个数
                onumber +=1;

           }

    if(sum==xNum*yNum&&onumber==Num)
    {
        clearInterval(timer);
        return 2;} //找到全部雷成功
    if(sum==xNum*yNum-1&&onumber==Num-1&&lastNum==1)
    {
        clearInterval(timer);
        return 2;} //找到全部雷成功
    return 0;

}
function fail(i,j){
    $("#fail_img").css({display:"block"});
    $("#cell-"+i+"-"+j).addClass("lei");
   $("#cell-"+i+"-"+j).removeClass("flag").removeClass("wenhao");
    for(var m=0;m<xNum;m++){
        for(var n=0;n<yNum;n++){
            if(array[m][n]==-1&&m!=i&&n!=j){
                $("#cell-"+m+"-"+n).addClass("lei");
                $("#cell-"+m+"-"+n).css({backgroundColor:"#aaaaaa"});
            }
        }
    }
    setTimeout("$('#fail_img').css({display:'none'});show_div('fail');",700);

}
function success(){
    show_div("success");
}