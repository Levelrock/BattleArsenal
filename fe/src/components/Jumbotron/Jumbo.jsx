import React from 'react'
import Card from 'react-bootstrap/Card';
import './jumbo.css'

const Jumbo = () => {
    return (
        <Card className="bg-dark text-white">
            <Card.Img src="https://www.gunsweek.com/sites/default/files/styles/mt_slideshow/public/archive/contents/pistols/articles/brownells-armeria-big-game-armi-custom/Pistole_Custom_-_Brownells_e_Armeria_Big_Game_1.JPG?itok=JQOjpymT" alt="Card image" className='jumbo_img'/>
        </Card>)
}

export default Jumbo