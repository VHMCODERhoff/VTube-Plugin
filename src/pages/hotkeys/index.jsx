
import LogoVtube from '../../assets/img/vtubelogo.png'
import HotKeyImage from '../../assets/img/keyboard.svg'
import { Card, Logo, Label, Description, Description2, Subcard, Input, Button, Line, CardContainer, Container, ButtonSelect } from './styles'
import { useEffect, useState } from 'react'
import { ApiClient } from 'vtubestudio'
import { useNavigate } from "react-router-dom";


const TutorialScreen = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <section>
                <Logo src={LogoVtube} alt="VTube Logo" />

                <Container>
                    <Card>
                        <Label>HotKeys</Label>
                        <Description>Step 1: <a style={{color: 'black', fontWeight: '400'}}>
                            Make sure you have VTube Studio installed on your computer and open it.
                            </a></Description>
                        <Description>Step 2: <a style={{color: 'black', fontWeight: '400'}}>
                            Keep the website open along with VTube Studio.
                            </a></Description>
                        <Description>Step 3: <a style={{color: 'black', fontWeight: '400'}}>
                            In the VTube Studio interface, go to the settings menu by clicking the hold icon in the upper right corner of the screen.
                            </a></Description>
                            <Description>Step 4: <a style={{color: 'black', fontWeight: '400'}}>
                            In the settings window, click on the "Plugins" option on the left sidebar.
                            </a></Description>
                            <Description>Step 5: <a style={{color: 'black', fontWeight: '400'}}>
                            Find the website plugin you want to connect from the list of installed plugins. Make sure it's enabled. If not, click the "Enable" button to activate it.
                            </a></Description>

                            <Description>Step 6: <a style={{color: 'black', fontWeight: '400'}}>
                            Go back to the website page and check if the plugin is running correctly.
                            </a></Description>

                            <Description>Step 7: <a style={{color: 'black', fontWeight: '400'}}>
                            Keep VTube Studio open for as long as you want to use the website. If you close VTube Studio, the connection to the website will be broken.
                            </a></Description>
                       
                    </Card>
                    
                </Container>

                <div>
                    <Card>
                          <ButtonSelect onClick={() => navigate('/dashboard')}>Back to menu</ButtonSelect>
                    </Card>
                </div>

            </section>
        </div>
    )
}


export default TutorialScreen