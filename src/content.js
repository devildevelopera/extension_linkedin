/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from "./App";
import "./content.css";

class Main extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                       
                      //  return (
                      //     <div className={'my-extension'}>
                      //          <h1>Hello world - My first Extension</h1>
                      //     </div>
                      //  )
                      return <div>
                                <App document={document} window={window} name={this.props.name} photo={this.props.photo} url={this.props.url} position={this.props.position} email={this.props.email} twitter={this.props.twitter} phone={this.props.phone}/> 
                                <p className="contactInfoBtn">
                                  {/* <button className="button button2" onClick={reset}>Reset</button> */}
                                  <button className="button button1" onClick={getInfo}>Contact Info</button>
                                </p>
                            </div>
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
     var aTagGroup = document.getElementsByTagName("a");
     for (var i = 0; i < aTagGroup.length; i++) {
       if(aTagGroup[i].outerHTML.includes('contact_see_more')){
         aTagGroup[i].click();
       }
     }
   }else{
     app.style.display = "none";
   }
}

function getInfo() {
  // setTimeout(function(){
    if(document.getElementById('pv-contact-info')){
      var name = '';
      var photo = '';
      var position = '';
      var url = '';
      var phone = '';
      var email = '';
      var twitter = '';
      name = document.getElementById('pv-contact-info').innerHTML;

      var photoGroup = document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view');
      if(photoGroup.length > 0){
        photo = photoGroup[0].src;
      } else {
        var myphotoGroup = document.getElementsByClassName('profile-photo-edit__preview ember-view');
          if(myphotoGroup.length > 0){
            photo = myphotoGroup[0].src;
          }
      }

      var positionGroup = document.getElementsByClassName("mt1 t-18 t-black t-normal");
      if(positionGroup.length > 0){
        position = positionGroup[0].innerHTML.trim();
      }

      var phoneGroup = document.getElementsByClassName("t-14 t-black t-normal");
      if(phoneGroup.length > 0){
        for (var i = 0; i < phoneGroup.length; i++) {
          if(phoneGroup[i].tagName === 'SPAN'){
            var phone1 = phoneGroup[i].innerHTML.trim();
            var phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            var digits = phone1.replace(/\D/g, "");
            if(phoneRe.test(digits)){
              phone = phone1;
              break;
            }
          }
        }
      }
      var urlGroup = document.getElementsByClassName('pv-contact-info__contact-link');
      for (var i = 0; i < urlGroup.length; i++) {
        if(urlGroup[i].outerHTML.includes('https://www.linkedin.com/')){
          url = urlGroup[i].href.trim();
        } else if(urlGroup[i].outerHTML.includes('mailto:')){
          email = urlGroup[i].innerHTML.trim();
        } else if(urlGroup[i].outerHTML.includes('https://twitter.com/')){
          twitter = urlGroup[i].href.trim();
        }
      }
      ReactDOM.render(<Main name={name} photo={photo} url={url} position={position} email={email} twitter={twitter} phone={phone}/>, app);
    }
  // }, 500);
}

// function reset() {
//   var name = '';
//   var photo = '';
//   var position = '';
//   var url = '';
//   var phone = '';
//   var email = '';
//   var twitter = '';
//   ReactDOM.render(<Main name={name} photo={photo} url={url} position={position} email={email} twitter={twitter} phone={phone}/>, app);
//   const modal_div = document.getElementsByClassName("artdeco-modal__dismiss artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view");
//   if(modal_div.length > 0){
//     if(modal_div[0]){
//       modal_div[0].click();
//     }
//   }
// }
