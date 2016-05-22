import WaterfallAlbum from "./WaterfallAlbum.js";
import PuzzleAlbum from "./PuzzleAlbum.js";
import BarrelAlbum from "./BarrelAlbum.js";

function WooAlbum(type, opt){
    function replaceFirstUpper(str) {     
        str = str.toLowerCase();     
        return str.replace(/\b(\w)|\s(\w)/g, function(m){  
                return m.toUpperCase();  
                });    
    }
    var _type = type.toLowerCase(); 
    var TYPE = {
        'waterfall' : WaterfallAlbum,
        'puzzle' : PuzzleAlbum,
        'barrel' : BarrelAlbum,
    };
    if(TYPE[_type] === undefined) {
        console.error("The type doesnt exsist!");
    } else {
        return new TYPE[_type](opt);    
    }
}
window.WooAlbum = WooAlbum;
export default WooAlbum;
