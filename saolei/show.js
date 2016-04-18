/**
 *
 * @class
 * @version
 * @author dou lianjun <doulianjun@gmail.com>
 * @date: 14-10-20
 * @time: 下午1:33
 */
function getPosTop(i,j){
    return 30*i;
}
function getPosLeft(i,j){
    return 30*j;
}
function bg_color(value){
    switch (value){
        case -1: return "red";break;
        case -2: return "#abcdef";break;
        default :return "#aaaaaa";break;
    }}
function font_color(value){
    switch (value){
        case -1: return "black";break;
        case 1:return "blue";break;
        case 2:return "green";break;
        default :return "red";break;
    }}
function show_number(i,j,num){    //显示方格数字
    $("#cell-"+i+"-"+j).removeClass("wenhao");
    if(num==0&&is_open[i][j]!=2){
        $("#cell-"+i+"-"+j).text("");
        $("#cell-"+i+"-"+j).css({backgroundColor:bg_color(num)});
        $("#cell-"+i+"-"+j).css({color:font_color(num)});
        if(i>0&&j>0&&(is_open[i-1][j-1]==0||is_open[i-1][j-1]==3)){
            open(i-1,j-1);
        }
        if(j>0&&(is_open[i][j-1]==0||is_open[i][j-1]==3)){
            open(i,j-1);
        }
        if(i<xNum-1&&j>0&&(is_open[i+1][j-1]==0||is_open[i+1][j-1]==3)){
            open(i+1,j-1);
        }
        if(i>0&&(is_open[i-1][j]==0||is_open[i-1][j]==3)){
            open(i-1,j);
        }
        if(i<xNum-1&&(is_open[i+1][j]==0||is_open[i+1][j]==3)){
            open(i+1,j);
        }

        if(i>0&&j<yNum-1&&(is_open[i-1][j+1]==0||is_open[i-1][j+1]==3)){
            open(i-1,j+1);
        }
        if(j<yNum-1&&(is_open[i][j+1]==0||is_open[i][j+1]==3)){
            open(i,j+1);
        }
        if(i<xNum-1&&j<yNum-1&&(is_open[i+1][j+1]==0||is_open[i+1][j+1]==3)){
            open(i+1,j+1);
        }

    }
    else if(is_open[i][j]!=2){
        $("#cell-"+i+"-"+j).text(num);
        $("#cell-"+i+"-"+j).css({backgroundColor:bg_color(num)});
        $("#cell-"+i+"-"+j).css({color:font_color(num)});
    }

}

function show_bg(i,j,num){        //显示方格背景色
    if(i>0&&j>0&&(is_open[i-1][j-1]==0||is_open[i-1][j-1]==3)){
        $("#cell-"+(i-1)+"-"+(j-1)).css({backgroundColor:bg_color(num)});
    }
    if(j>0&&(is_open[i][j-1]==0||is_open[i][j-1]==3)){
        $("#cell-"+i+"-"+(j-1)).css({backgroundColor:bg_color(num)});
    }
    if(i<xNum-1&&j>0&&(is_open[i+1][j-1]==0||is_open[i+1][j-1]==3)){
        $("#cell-"+(i+1)+"-"+(j-1)).css({backgroundColor:bg_color(num)});
    }
    if(i>0&&(is_open[i-1][j]==0||is_open[i-1][j]==3)){
        $("#cell-"+(i-1)+"-"+j).css({backgroundColor:bg_color(num)});
    }
    if(i<xNum-1&&(is_open[i+1][j]==0||is_open[i+1][j]==3)){
        $("#cell-"+(i+1)+"-"+j).css({backgroundColor:bg_color(num)});
    }

    if(i>0&&j<yNum-1&&(is_open[i-1][j+1]==0||is_open[i-1][j+1]==3)){
        $("#cell-"+(i-1)+"-"+(j+1)).css({backgroundColor:bg_color(num)});
    }
    if(j<yNum-1&&(is_open[i][j+1]==0||is_open[i][j+1]==3)){
        $("#cell-"+i+"-"+(j+1)).css({backgroundColor:bg_color(num)});
    }
    if(i<xNum-1&&j<yNum-1&&(is_open[i+1][j+1]==0||is_open[i+1][j+1]==3)){
        $("#cell-"+(i+1)+"-"+(j+1)).css({backgroundColor:bg_color(num)});
    }
}
function lei_count(i,j){     //雷数
    array[i][j]=0;
    if(i>0&&j>0&&array[i - 1][j - 1] == -1) array[i][j] ++;
    if(i>0&&array[i - 1][j] == -1)array[i][j] ++;
    if(i>0&&j<yNum-1&&array[i - 1][j + 1] == -1) array[i][j] ++;
    if(j<yNum-1&&array[i][j + 1] == -1) array[i][j] ++;
    if(i<xNum-1&&j<yNum-1&&array[i + 1][j + 1] == -1) array[i][j] ++;
    if(i<xNum-1&&array[i + 1][j] == -1) array[i][j] ++;
    if(i<xNum-1&&j>0&&array[i + 1][j - 1] == -1) array[i][j] ++;
    if(j>0&&array[i][j - 1] == -1) array[i][j] ++;
    return   array[i][j];
}
function flag_count(i,j){     //红旗数
    var flag=0;
    if(i>0&&j>0&&is_open[i - 1][j - 1] == 2) flag++;
    if(i>0&&is_open[i - 1][j] == 2)flag++;
    if(i>0&&j<yNum-1&&is_open[i - 1][j + 1] ==2) flag++;
    if(j<yNum-1&&is_open[i][j + 1] == 2) flag ++;
    if(i<xNum-1&&j<yNum-1&&is_open[i + 1][j + 1] ==2) flag++;
    if(i<xNum-1&&is_open[i + 1][j] == 2) flag++;
    if(i<xNum-1&&j>0&&is_open[i + 1][j - 1] ==2) flag ++;
    if(j>0&&is_open[i][j - 1] == 2) flag++;
    return  flag;
}
function show_div(id){
    var width=$(window).width();
    var height=$(window).height();
    $("#"+id).find(".select").find("span").text(time);
     $("#"+id).css({
         display:"block",
         width:width+"px",
         height:height+"px"
     });
    $(".select").css({
        marginLeft:width/2-180+"px",
        marginTop:height/2-200+"px"
    })

}