import './Dice.css'
export default function dice({diceFace, autoRun, onClick}){
    const styles = getComputedStyle(document.body);

    function clickRotate(){
        onClick();
        // This section is only to make sure you select the whole dice
        const diceElement = document.getElementsByClassName("dice")[0]

        diceElement.classList.toggle('random-rotation');
        setTimeout(function() {
                diceElement.classList.remove('random-rotation');
            }, 2000);
        
        // Targeted side
        var facingSide = diceFace;
        var transform = null;

        switch(facingSide){
            case 1:
                transform = styles.getPropertyValue('--dice-face-one');
                break;
            case 2:
                transform = styles.getPropertyValue('--dice-face-two');
                break;
            case 3:
                transform = styles.getPropertyValue('--dice-face-three');
                break;
            case 4:
                transform = styles.getPropertyValue('--dice-face-four');
                break;
            case 5:
                transform = styles.getPropertyValue('--dice-face-five');
                break;
            case 6:
                transform = styles.getPropertyValue('--dice-face-six');
                break;
            default:
                transform = null;
        }

        console.log(facingSide);
        diceElement.style = "transform: "+transform+"; transition: all 0.1s ease-out;";
    }

    if(autoRun)
    {
        clickRotate();
        autoRun = false;
    }

    return(
        <>
        <div className="dice" onClick={clickRotate}>
            <div className="face one" data-face="1">
                <div className='pip' style={{gridArea:'pip5'}}/>
            </div>
            <div className="face two " data-face="2">
                <div className='pip' style={{gridArea:'pip1'}}/><div className='pip' style={{gridArea:'pip9'}}/>
            </div>
            <div className="face three" data-face="3">
                <div className='pip' style={{gridArea:'pip1'}}/><div className='pip' style={{gridArea:'pip5'}}/><div className='pip' style={{gridArea:'pip9'}}/>
            </div>
            <div className="face four" data-face="4">
                <div className='pip' style={{gridArea:'pip1'}}/><div className='pip' style={{gridArea:'pip3'}}/><div className='pip' style={{gridArea:'pip7'}}/><div className='pip' style={{gridArea:'pip9'}}/>
            </div>
            <div className="face five" data-face="5">
                <div className='pip'style={{gridArea:'pip1'}}/><div className='pip' style={{gridArea:'pip3'}}/><div className='pip' style={{gridArea:'pip5'}}/><div className='pip' style={{gridArea:'pip7'}}/><div className='pip' style={{gridArea:'pip9'}}/>
            </div>
            <div className="face six" data-face="6">
                <div className='pip'/><div className='pip'/><div className='pip'/><div className='pip'/><div className='pip'/><div className='pip'/>
            </div>
        </div>
        </>
    )
}