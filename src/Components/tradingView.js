import React, { useEffect } from 'react'
import { CryptoState } from '../CryptoContext';

const TradingView =({ coin })  => {

    const {currency}= CryptoState();
    

    useEffect(() => {
        const widget = new window.TradingView.widget({
        //   autosize: true,
          
           
        //   symbol: 'BITBNS:BTCINR',
          symbol: `${coin}${currency}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'in',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_a7608'
        });
    
        // return () => {
        //   widget.remove();
        // };
      }, []);
    

  return (
    <div>


<div className="tradingview-widget-container ">
        <div id="tradingview_a7608"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://in.tradingview.com/" rel="noopener noreferrer" target="_blank">
            <span className="blue-text">Live from TradingView</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TradingView