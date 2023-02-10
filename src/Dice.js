import './Dice.css'
export default function dice({rotateDice}){

    return(
        <>
        <div className="dice" onClick={rotateDice}>
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