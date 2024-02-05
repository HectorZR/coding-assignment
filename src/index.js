import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './data/store';
import './index.css';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundary>
				<Provider store={store}>
					<App />
				</Provider>
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>
);
