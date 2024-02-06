import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/errorBoundary.scss';

export class ErrorBoundary extends Component {
	state = { hasError: false, message: '' };

	static getDerivedStateFromError(error) {
		return { hasError: true, message: error.message };
	}

	refreshPage() {
		window.location.reload();
	}

	render() {
		return this.state.hasError ? (
			<div className="error-boundary">
				<div data-testid="error">Something went wrong</div>
				<p>{this.state.message}</p>
				<div>
					<button onClick={this.refreshPage()}>Refresh to try again</button>
				</div>
				<p>
					Go to <Link to="/">home</Link>
				</p>
			</div>
		) : (
			this.props.children
		);
	}
}
