import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from './components/layouts/Layouts'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import './locales'

const environment = process.env.NODE_ENV
if (environment !== 'production' && appConfig.enableMock) {
    mockServer({ environment })
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Theme>
                        <Layout />
                    </Theme>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
