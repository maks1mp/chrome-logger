//  beautiful logger 

let logger = {
    scheme: {
        font: {
            prop:'font-size',
            sm: ' 8px',
            md: 'font-size: 12px',
            lg: 'font-size: 16px', 
            default: '12px',
        },
        background: {
            prop: 'background-color',
            success: 'green',
            error: 'red',
            warning: 'yellow',
            default: ' #fff',
        },
        color: {
            prop: 'color',
            success: '#fff',
            warning: '#fff',
            default: '#333',
            warning: '#000',
        } 
    },
    createStyle(category, property='default'){
        return `${this.scheme[category].prop}:${this.scheme[category][property]};`;
    },
    combineStyles(method){
        return this.createStyle('color', method)+this.createStyle('background', method)+this.createStyle('font');
    },
    send(){
        let args = Array.from(arguments);
        let printData = args.slice(1),
            styles = this.combineStyles(args[0]);

        if (printData.length) {
            printData.forEach((item, index)=>{
                let t = typeof item;
                console.log(`%cindex:${index+1}; type: ${item instanceof Array ? 'array' : t};`, styles);
                switch(t){
                    case 'string':
                    case 'number':
                        console.log(`%c ${item}`, styles);
                        break;
                    case 'array':
                    case 'object':
                    case 'symbol':
                    case 'function':
                        console.log(item);
                        break;
                    default:
                        console.log(`%c${item}`, this.combineStyles('warning'));
                }
            });
        } else console.warn(' method called without arguments');
        
    },
    success(){
        this.send('success', ...arguments);
    }

}
logger.success('hello');
logger.send('success', 1,2,3,4,'hello', {title: 'gusman'}, undefined, ['q', 'w', 'e']);


