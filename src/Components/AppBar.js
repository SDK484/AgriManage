import React from 'react';
import ArgiLogo from '../Imgs/ArgiLogo.png';
import TogOffLogo from '../Imgs/TogOffLogo.png';
import TogOnLogo from '../Imgs/TogOnLogo.png';
import UserLogo from '../Imgs/UserLogo.png';
import SettingsLogo from '../Imgs/SettingsLogo.png';

function AppBar() {
	return (
		<div style={{ position: 'relative', backgroundColor: '#808080', height: '8vh', width: '100vw', overflowX: 'hidden', overflowY: 'hidden' }}>
			<div style={{ position: 'relative', top: 5, left: 15 }}>
				<div style={{ content: "", display: 'table', float: 'left' }}>
					<div style={{ float: 'left' }}>
						<img src={ArgiLogo} />
					</div>
					<div style={{ position: 'relative', float: 'left', width: 10, border: '1px solid #808080' }}></div>
					<div style={{ position: 'relative', float: 'left', bottom: 8 }}>
						<h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Agri. Manage System</h2>
					</div>
				</div>
				<div style={{ content: "", display: 'table', float: 'left', paddingLeft: 20 }}>
					<div style={{ position: 'relative', float: 'left', bottom: 2 }}>
						<h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Tab</h3>
					</div>
					<div style={{ float: 'left' }}>
						<img style={{ }} src={TogOnLogo} />
					</div>
					<div style={{ position: 'relative', float: 'left', bottom: 2 }}>
						<h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Grid</h3>
					</div>
				</div>
			</div>
			<div style={{ position: 'relative', top: 5, right: 15}}>
				<div style={{ float: 'right'}}>
					<div style={{ float: 'left', position: 'relative', bottom: 5 }}>
						<a href="https://docs.google.com/spreadsheets/d/1DBnPUmH1l79fgBzt0dj1J0R6XvgPuK-01b06cCFV7qE/edit?usp=sharing" target="_blank" style={{ textDecoration: 'none' }}>
							<h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#000000', border: '2px solid black' }}>
								Spreadsheet
							</h3>
						</a>
					</div>
					<div style={{ float: 'left', position: 'relative', bottom: 5, paddingLeft: 10 }}>
						<a href="./IntHtml/ModalML.html" target="_blank" style={{ textDecoration: 'none' }}>
							<h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#000000', border: '2px solid black' }}>
								Analytics
							</h3>
						</a>
					</div>
					<div style={{ float: 'left' }}>
						<img style={{ }} src={SettingsLogo} />
					</div>
					<div style={{ float: 'left' }}>
						<img style={{  }} src={UserLogo} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppBar;