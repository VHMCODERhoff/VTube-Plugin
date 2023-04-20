import LogoVtube from '../../assets/img/vtubelogo.png'
import HotKeyImage from '../../assets/img/keyboard.svg'
import { Card, Logo, Label, Description, Description2, Subcard, Input, Button, Line, CardContainer, Container, ButtonSelect } from './styles'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ApiClient, HotkeyType, ErrorCode } from 'vtubestudio'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [apiClient, setApiClient] = useState(null)
    const [hotkey, setHotkey] = useState({ text: "" });
    const [hotkeyAnimationModel, setHotkeyAnimationModel] = useState({ hotkeyID: "", keyCombinationFirstValue: '', keyCombinationSecondValue: '' });
    const [hotkeyMoveModel, setHotkeyMoveModel] = useState({ size: "", positionX: "", positionY: "", rotation: "" });
    const [yourTestMessage, setYourTestMessage] = useState('')
    const [counter, setCounter] = useState(0)
    const [modelLoaded, setModelLoaded] = useState(false)
    const [modelID, setModelID] = useState('')
    const [modelName, setModelName] = useState('')
    const [availableModels, setAvailableModels] = useState([])
    const [availableHotkeys, setAvailableHotkeys] = useState([])

    useEffect(() => {

        if (localStorage.getItem('VTS.JS_TEST_AUTH_TOKEN_Login') === null) return navigate('/')

        const apiClient = new ApiClient({
            authTokenGetter: () => localStorage.getItem('VTS.JS_TEST_AUTH_TOKEN'),
            authTokenSetter: (authenticationToken) => localStorage.setItem('VTS.JS_TEST_AUTH_TOKEN', authenticationToken),
            pluginDeveloper: 'Hawkbar',
            pluginName: 'VTS.JS Test',
        })

        setApiClient(apiClient)

        apiClient.on('connect', async () => {
            const { availableModels } = await apiClient.availableModels()
            const { availableHotkeys } = await apiClient.hotkeysInCurrentModel()
            console.log(availableHotkeys)
            setAvailableHotkeys(availableHotkeys)
            setAvailableModels(availableModels)

            await apiClient.events.modelLoaded.subscribe(({ modelLoaded, modelID, modelName }) => {
                setModelLoaded(modelLoaded)
                setModelID(modelID)
                setModelName(modelName)
            })

            await apiClient.events.test.subscribe(({ yourTestMessage, counter }) => {
                setYourTestMessage(yourTestMessage)
                setCounter(counter)
            }, {
                testMessageForEvent: 'Echo test'
            })

            const { modelLoaded, modelID, modelName } = await apiClient.currentModel()
            setModelLoaded(modelLoaded)
            setModelID(modelID)
            setModelName(modelName)
        })

        /* return () => {
             apiClient.disconnect()
         }*/
    }, [])

    const SaveHotKey = () => {
        if (modelLoaded) {
            HotkeyType.TriggerAnimation = hotkey.text
            alert(`Hotkey ${hotkey.text} saved!`)
            setHotkey({ text: "" })
        }
    }

    /*const SaveModelAnimation = () => {
        if (modelLoaded) {
            if (hotkeyAnimationModel.MoveModel !== "") HotkeyType.MoveModel = hotkeyAnimationModel.MoveModel
            if (hotkeyAnimationModel.ChangeBackground !== "") HotkeyType.ChangeBackground = hotkeyAnimationModel.ChangeBackground
            if (hotkeyAnimationModel.ExecuteItemAction !== "") HotkeyType.ExecuteItemAction = hotkeyAnimationModel.ExecuteItemAction
            if (hotkeyAnimationModel.ReloadTextures !== "") HotkeyType.ReloadTextures = hotkeyAnimationModel.ReloadTextures
            if (hotkeyAnimationModel.ReloadMicrophone !== "") HotkeyType.ReloadMicrophone = hotkeyAnimationModel.ReloadMicrophone
            if (hotkeyAnimationModel.CalibrateCam !== "") HotkeyType.CalibrateCam = hotkeyAnimationModel.CalibrateCam
            if (hotkeyAnimationModel.TakeScreenshot !== "") HotkeyType.TakeScreenshot = hotkeyAnimationModel.TakeScreenshot
            if (hotkeyAnimationModel.ExecuteItemAction !== "") HotkeyType.ExecuteItemAction = hotkeyAnimationModel.ExecuteItemAction

            alert(`Hotkey saved!`)
            setHotkeyAnimationModel({ ChangeBackground: "", ExecuteItemAction: "", ReloadMicrophone: "", MoveModel: "", ReloadTextures: "", CalibrateCam: "", TakeScreenshot: "" })
        }
    }*/

    /* const SaveModelAnimation = async () => {
         if (modelLoaded) {
 
 
             await apiClient.hotkeysInCurrentModel({
                 hotkeyID: hotkeyAnimationModel.hotkeyID,
                 keyCombination: ["Alt", "X"]
             })
             console.log({
                 hotkeyID: hotkeyAnimationModel.hotkeyID,
                 keyCombination: ["164", "87"]
             })
             toast.success('Hotkey Saved', {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
             });
             setHotkeyAnimationModel({ hotkeyID: "", keyCombinationFirstValue: '', keyCombinationSecondValue: '' });
         }
     }*/

    const TriggerAnimation = async (id) => {
        try {
            await apiClient.hotkeyTrigger({
                hotkeyID: id,
                // itemInstanceID: ["Alt", "X"]
            })
            toast.success('hotkey triggered', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error('not possible to save, something was wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }

    }

    const ChangeModel = async (m) => {
        try {
            apiClient?.modelLoad({ modelID: m.modelID })
            window.location.reload();
            toast.success('model changed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error('not possible to save, something was wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }




    const SaveModelMovement = async () => {
        if (modelLoaded) {
            await apiClient.moveModel({
                size: hotkeyMoveModel.size,
                positionX: hotkeyMoveModel.positionX,
                positionY: hotkeyMoveModel.positionY,
                rotation: hotkeyMoveModel.rotation,
                timeInSeconds: 1,
                valuesAreRelativeToModel: true
            })
            toast.success('Movement Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <section>
                <Logo src={LogoVtube} alt="VTube Logo" />

                <Container>
                    <Card>
                        <Label>Models {modelLoaded ? 'Connected' : 'Offline'}</Label>
                        <Description>Model Loaded: <a style={{ color: 'black', fontWeight: '400' }}>{modelLoaded ? 'Yes' : 'No'}</a></Description>
                        <Description>Model ID: <a style={{ color: 'black', fontWeight: '400' }}>{modelID ? modelID : 'none'}</a></Description>
                        <Description>Model Name: <a style={{ color: 'black', fontWeight: '400' }}>{modelName ? modelName : 'none'}</a></Description>
                        <CardContainer>
                            {availableModels.map(m =>
                                <div key={m.modelID}>
                                    <Button onClick={() => ChangeModel(m)}>{m.modelName}</Button>
                                </div>)}
                        </CardContainer>
                    </Card>


                    {<Card>

                        <Label>HotKeys List</Label>
                        <Description2>Trigger and view the current Model Hotkeys loaded</Description2>
                        <CardContainer>
                            {
                                availableHotkeys.map(h =>
                                    <div key={h.hotkey}>
                                        <Subcard>
                                            <Description>HotKey ID: <a style={{ color: 'black', fontWeight: '400' }}>{h.hotkeyID}</a></Description>
                                            <Description>Name: <a style={{ color: 'black', fontWeight: '400' }}>{h.name}</a></Description>
                                            <Description>Description: <a style={{ color: 'black', fontWeight: '400' }}>{h.description}</a></Description>
                                            <Description>Type: <a style={{ color: 'black', fontWeight: '400' }}>{h.type}</a></Description>
                                            <Description>File: <a style={{ color: 'black', fontWeight: '400' }}>{h.file}</a></Description>
                                            <Button onClick={() => TriggerAnimation(h.hotkeyID)}>Trigger</Button>
                                        </Subcard>
                                        <Line />
                                    </div>)
                            }

                        </CardContainer>
                        <Line />
                        <br />

                    </Card>}


                    {/*<Card>
                        <Label>HotKeys Config</Label>
                        <Description2>set a hotkeys</Description2>
                        <CardContainer>
                            <Description>Model Loaded Name: <a style={{ color: 'black', fontWeight: '400' }}>{modelName ? modelName : 'none'}</a></Description>
                        </CardContainer>
                        <Input
                            type="text"
                            value={hotkeyAnimationModel.hotkeyID}
                            placeholder='hotkeyID'
                            onChange={(e) => setHotkeyAnimationModel({ hotkeyID: e.target.value })}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Input
                                type="text"
                                value={hotkeyAnimationModel.keyCombinationFirstValue}
                                placeholder='Key Combination'
                                onChange={(e) => setHotkeyAnimationModel({ keyCombinationFirstValue: e.target.value })}
                            />

                            <Input
                                type="text"
                                value={hotkeyAnimationModel.keyCombinationSecondValue}
                                placeholder='key Combination Second'
                                onChange={(e) => setHotkeyAnimationModel({ keyCombinationSecondValue: e.target.value })}
                            />
                        </div>



                        <Button onClick={() => SaveModelAnimation()}>Save</Button>
                        </Card>*/}

                    {<Card>
                        <Label>Move Model</Label>
                        <Description2>rotate the current model loaded by settings</Description2>
                        <CardContainer>
                            <Description>Model Loaded Name: <a style={{ color: 'black', fontWeight: '400' }}>{modelName ? modelName : 'none'}</a></Description>
                        </CardContainer>
                        <Input
                            type="text"
                            value={hotkeyMoveModel.size}
                            placeholder='size of model'
                            onChange={(e) => setHotkeyMoveModel({ size: e.target.value })}
                        />
                        <Input
                            type="text"
                            value={hotkeyMoveModel.positionX}
                            placeholder='position X of model'
                            onChange={(e) => setHotkeyMoveModel({ positionX: e.target.value })}
                        />
                        <Input
                            type="text"
                            value={hotkeyMoveModel.positionY}
                            placeholder='position Y of model'
                            onChange={(e) => setHotkeyMoveModel({ positionY: e.target.value })}
                        />
                        <Input
                            type="text"
                            value={hotkeyMoveModel.rotation}
                            placeholder='rotation of model'
                            onChange={(e) => setHotkeyMoveModel({ rotation: e.target.value })}
                        />
                        <Button onClick={() => SaveModelMovement()}>Save</Button>
                    </Card>}
                </Container>

                <div>
                    <Card>
                        <Label>How to use (Guide)</Label>
                        {<Container>
                            <ButtonSelect onClick={() => navigate('/dashboard/tutorial')}>Connect to Vtube Studio Plugin</ButtonSelect>
                            {/*<ButtonSelect>HotKey</ButtonSelect>
                            <ButtonSelect>Model Movement</ButtonSelect>
                            <ButtonSelect>Statistics</ButtonSelect>*/}
                        </Container>}

                    </Card>
                </div>

            </section>
        </div>
    )
}


export default HomeScreen