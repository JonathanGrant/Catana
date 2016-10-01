# Example Python script 
# (for rapydscript, a python to javascript compiler)
 
def doHelloMessage():
   alert('Ready to CATANA? Press Okay to continue, Cancel to quit.')
doHelloMessage()
 
# modify html page
document.getElementById("result").innerHTML = 'Catana, your defender.' 
 
# write into log 
console.log('hello from python')

def catTutorial():
    images = document.getElementsByTagName('img')
    console.log(images)
    # for image in images:
    #   image.src = 'http://placekitten.com/' + image.width + '/' + image.height
catTutorial()