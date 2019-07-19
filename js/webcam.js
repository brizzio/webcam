var initialized = false;
    //window.onload = function(){
    function button_callback() {
        // verifica se iniciou
        if(initialized)
            return; // if yes, then do not initialize everything again
    
	    //get the drawing context on the canvas 
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        
        /*
            esta função é chamada cada vez que um quadro de vídeo fica disponível
        */
        var processfn = function(video, dt) {
            // render the video frame to the canvas element and extract RGBA pixel data
            ctx.drawImage(video, 0, 0);
            var rgba = ctx.getImageData(0, 0, 640, 480).data;
            // prepare input to `run_cascade`
            image = {
                "pixels": rgba_to_grayscale(rgba, 480, 640),
                "nrows": 480,
                "ncols": 640,
                "ldim": 640
            }
        }  
        /*
            instantiate camera handling (see https://github.com/cbrandolino/camvas)
        */
        var mycamvas = new camvas(ctx, processfn);
        /*
            (6) it seems that everything went well
        */
        initialized = true;
    }

/*
define a function to transform an RGBA image to grayscale
*/
function rgba_to_grayscale(rgba, nrows, ncols) {
    var gray = new Uint8Array(nrows*ncols);
    for(var r=0; r<nrows; ++r)
        for(var c=0; c<ncols; ++c)
            // gray = 0.2*red + 0.7*green + 0.1*blue
            gray[r*ncols + c] = (2*rgba[r*4*ncols+4*c+0]+7*rgba[r*4*ncols+4*c+1]+1*rgba[r*4*ncols+4*c+2])/10;
    return gray;
}