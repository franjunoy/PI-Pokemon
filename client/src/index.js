import './index.css'

// Importrt App and Store
import App from './App'
import store from './redux/store/store'

// Import Hooks
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)