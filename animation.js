class Animation {
    constructor(
        ctx,
        width,
        height,
        size,
    ) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.size = size;
    }

    board() {

        for(let x = 0; x < this.width; x+=this.size) 
        {
            for (let y = 0; y < this.height; y+=this.size) 
            {
                this.ctx.strokeStyle = "white";
                this.ctx.strokeRect(x,y,this.size,this.size)
            }
        }
    }

    update() {
        this.board();
    }
}

export default Animation;