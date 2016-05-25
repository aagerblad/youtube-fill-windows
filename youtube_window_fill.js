// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
/**
 * Register a callback function with the commands api, which will be called when
 * one of our registered commands is detected.
 */
chrome.commands.onCommand.addListener(function(command) {
  // Call 'update' with an empty properties object to get access to the current
  // tab (given to us in the callback function).
  chrome.tabs.update({}, function(tab) {
    if (command == 'embedd')
      tabUrl = tab.url;
      if (/.*youtube.com.*/.test(tabUrl)) {
        var id = youtube_parser(tabUrl);
        var newUrl = "http://www.youtube.com/embed/" + id + "?autoplay=1";
          chrome.tabs.update(tab.id, {url: newUrl});
      }
  });
});