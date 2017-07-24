
import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    children: PropTypes.string,
  };

  render(){
    const {title, description, style, scripts, state, children} = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="renderer" content="webkit" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0,  maximum-scale=1.0, user-scalable=no" />
          <title>{title}</title>
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link rel="stylesheet" href="/css/core.css"/>
          <link rel="stylesheet" href="/fonts/boxlinker/style.css"/>
          <link rel="stylesheet" href="/javascript/simplemde/simplemde.min.css" />
          <script type="text/javascript" src="/javascript/plupload/moxie.js"></script>
          <script type="text/javascript" src="/javascript/plupload/plupload.dev.js"></script>
          <script type="text/javascript" src="/javascript/simplemde/simplemde.min.js"></script>
          <link rel="stylesheet" href="/javascript/pace/pace.min.css" />
          <script type="text/javascript" src="/javascript/pace/pace.min.js"></script>
          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} ></div>
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {scripts && scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
