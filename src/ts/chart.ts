import { productCategory } from './app';

type barEl = {
    x: number;
    x2: number;
}

export class BarChart {
    private canvasId = 'chart';
    private canvasEl: HTMLCanvasElement;
    private barSpacing = 5; // px
    private categories: productCategory[];
    private barXPositions: barEl[] = [];
    private prevBar = null;

    constructor(categories: productCategory[]) {
        this.categories = categories;
        this.canvasEl = document.getElementById(this.canvasId) as HTMLCanvasElement;
        this.canvasEl.addEventListener('mousemove', this.drawLegend.bind(this));

        window.addEventListener('resize', this.drawChart.bind(this));
    }

    drawChart() {
        this.clearValues();

        this.canvasEl.height = this.canvasEl.parentElement.clientHeight - 2; // Somehow grows 2px after every redraw
        this.canvasEl.width = this.canvasEl.parentElement.clientWidth;

        const ctx = this.canvasEl.getContext('2d');
        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height); // Clear
        
        const amountCategories = this.categories.length;

        const stepCanvas = this.canvasEl.height / 100; // 1% = ..px
        const step = 100 / this.categories[this.categories.length - 1].amount; // Biggest amount

        const barWidth = (this.canvasEl.width - (amountCategories - 2) * this.barSpacing) / amountCategories;

        let xPos = 0;
        for (let bar = 0; bar < this.categories.length; bar++) {
            const height = Math.round(Math.max(step * this.categories[bar].amount, 1) * stepCanvas);
            
            // Highlight the hovered bar
            if (bar == this.prevBar) {
                ctx.font = '30px Arial';
                ctx.fillStyle = '#E23276';
                ctx.textAlign = "center";
                ctx.fillText(`${this.categories[this.prevBar].name} (${this.categories[this.prevBar].amount})`, this.canvasEl.width/2, 30);
            } else {
                ctx.fillStyle = '#C23276';
            }
            
            ctx.fillRect(xPos, this.canvasEl.height - height, barWidth, height);

            this.barXPositions.push({
                x: xPos,
                x2: xPos + barWidth + this.barSpacing
            });
            
            xPos += barWidth + this.barSpacing;
        }
    }

    private clearValues() {
        this.barXPositions = [];

    }

    private drawLegend(e: MouseEvent) {
        const mouseX = e.x;
        const index = this.barXPositions.findIndex(barEl => {
            return mouseX > barEl.x && mouseX < barEl.x2
        });

        if (this.prevBar == index) {
            return;
        }

        this.prevBar = index;
        this.drawChart();

    }
}