#!/usr/bin/env node

var fs = require('fs'),
    lessonsFile = 'app/scripts/lessons.json';

function datePickerHtml(name) {
  var html = "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option>1</option>' +
    '  <option>2</option>' +
    '  <option>3</option>' +
    '  <option>4</option>' +
    '  <option>5</option>' +
    '  <option>6</option>' +
    '  <option>7</option>' +
    '  <option>8</option>' +
    '  <option>9</option>' +
    '  <option>10</option>' +
    '  <option>11</option>' +
    '  <option>12</option>' +
    '  <option>13</option>' +
    '  <option>14</option>' +
    '  <option>15</option>' +
    '  <option>16</option>' +
    '  <option>17</option>' +
    '  <option>18</option>' +
    '  <option>19</option>' +
    '  <option>20</option>' +
    '  <option>21</option>' +
    '  <option>22</option>' +
    '  <option>23</option>' +
    '  <option>24</option>' +
    '  <option>25</option>' +
    '  <option>26</option>' +
    '  <option>27</option>' +
    '  <option>28</option>' +
    '  <option>29</option>' +
    '  <option>30</option>' +
    '  <option>31</option>' +
    '</select>' +
    "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option>enero</option>' +
    '  <option>febrero</option>' +
    '  <option>marzo</option>' +
    '  <option>abril</option>  ' +
    '  <option>mayo</option>' +
    '  <option>junio</option>' +
    '  <option>julio</option>' +
    '  <option>agosto</option>  ' +
    '  <option>septiembre</option>' +
    '  <option>octubre</option>' +
    '  <option>noviembre</option>' +
    '  <option>diciembre</option>  ' +
    '</select>' +
    "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option>2014</option>' +
    '  <option>2015</option>' +
    '  <option>2016</option>' +
    '  <option>2017</option>' +
    '  <option>2018</option>' +
    '  <option>2019</option>' +
    '</select>';

  html = html.replace(/</g, "\\u003c");
  html = html.replace(/>/g, "\\u003e");

  return html;
}

function timePickerHtml(name) {
  var html = "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option value=\\\"1h\\\">1</option>' +
    '  <option value=\\\"2h\\\">2</option>' +
    '  <option value=\\\"3h\\\">3</option>' +
    '  <option value=\\\"4h\\\">4</option>' +
    '  <option value=\\\"5h\\\">5</option>' +
    '  <option value=\\\"6h\\\">6</option>' +
    '  <option value=\\\"7h\\\">7</option>' +
    '  <option value=\\\"8h\\\">8</option>' +
    '  <option value=\\\"9h\\\">9</option>' +
    '  <option value=\\\"10h\\\">10</option>' +
    '  <option value=\\\"11h\\\">11</option>' +
    '  <option value=\\\"12h\\\">12</option>' +
    '</select>' +
    ' : ' +
    "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option value=\\\"00m\\\">00</option>' +
    '  <option value=\\\"01m\\\">01</option>' +
    '  <option value=\\\"02m\\\">02</option>' +
    '  <option value=\\\"03m\\\">03</option>' +
    '  <option value=\\\"04m\\\">04</option>' +
    '  <option value=\\\"05m\\\">05</option>' +
    '  <option value=\\\"06m\\\">06</option>' +
    '  <option value=\\\"07m\\\">07</option>' +
    '  <option value=\\\"08m\\\">08</option>' +
    '  <option value=\\\"09m\\\">09</option>' +
    '  <option value=\\\"10m\\\">10</option>' +
    '  <option value=\\\"11m\\\">11</option>' +
    '  <option value=\\\"12m\\\">12</option>' +
    '  <option value=\\\"13m\\\">13</option>' +
    '  <option value=\\\"14m\\\">14</option>' +
    '  <option value=\\\"15m\\\">15</option>' +
    '  <option value=\\\"16m\\\">16</option>' +
    '  <option value=\\\"17m\\\">17</option>' +
    '  <option value=\\\"18m\\\">18</option>' +
    '  <option value=\\\"19m\\\">19</option>' +
    '  <option value=\\\"20m\\\">20</option>' +
    '  <option value=\\\"21m\\\">21</option>' +
    '  <option value=\\\"22m\\\">22</option>' +
    '  <option value=\\\"23m\\\">23</option>' +
    '  <option value=\\\"24m\\\">24</option>' +
    '  <option value=\\\"25m\\\">25</option>' +
    '  <option value=\\\"26m\\\">26</option>' +
    '  <option value=\\\"27m\\\">27</option>' +
    '  <option value=\\\"28m\\\">28</option>' +
    '  <option value=\\\"29m\\\">29</option>' +
    '  <option value=\\\"30m\\\">30</option>' +
    '  <option value=\\\"31m\\\">31</option>' +
    '  <option value=\\\"32m\\\">32</option>' +
    '  <option value=\\\"33m\\\">33</option>' +
    '  <option value=\\\"34m\\\">34</option>' +
    '  <option value=\\\"35m\\\">35</option>' +
    '  <option value=\\\"36m\\\">36</option>' +
    '  <option value=\\\"37m\\\">37</option>' +
    '  <option value=\\\"38m\\\">38</option>' +
    '  <option value=\\\"39m\\\">39</option>' +
    '  <option value=\\\"40m\\\">40</option>' +
    '  <option value=\\\"41m\\\">41</option>' +
    '  <option value=\\\"42m\\\">42</option>' +
    '  <option value=\\\"43m\\\">43</option>' +
    '  <option value=\\\"44m\\\">44</option>' +
    '  <option value=\\\"45m\\\">45</option>' +
    '  <option value=\\\"46m\\\">46</option>' +
    '  <option value=\\\"47m\\\">47</option>' +
    '  <option value=\\\"48m\\\">48</option>' +
    '  <option value=\\\"49m\\\">49</option>' +
    '  <option value=\\\"50m\\\">50</option>' +
    '  <option value=\\\"51m\\\">51</option>' +
    '  <option value=\\\"52m\\\">52</option>' +
    '  <option value=\\\"53m\\\">53</option>' +
    '  <option value=\\\"54m\\\">54</option>' +
    '  <option value=\\\"55m\\\">55</option>' +
    '  <option value=\\\"56m\\\">56</option>' +
    '  <option value=\\\"57m\\\">57</option>' +
    '  <option value=\\\"58m\\\">58</option>' +
    '  <option value=\\\"59m\\\">59</option>' +
    '</select>' +
    "<select name=\\\"" + name + "\\\" style=\\\"width: inherit;\\\">" +
    '  <option value=\\\"am\\\">am</option>' +
    '  <option value=\\\"pm\\\">pm</option>' +
    '</select>';

  html = html.replace(/</g, "\\u003c");
  html = html.replace(/>/g, "\\u003e");

  return html;
}

fs.readFile(lessonsFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  var inputs = data.match(/\\u003cinput.*?\\u003e/g);
  inputs.forEach(function(input) {
    if (input.match(/type=\\"date\\"/)) {
      var name = input.match(/name=\\"([^\\]+)\\"/)[1] || 'date';
      data = data.replace(input, datePickerHtml(name));
    } else if (input.match(/type=\\"time\\"/)) {
      var name = input.match(/name=\\"([^\\]+)\\"/)[1] || 'time';
      data = data.replace(input, timePickerHtml(name));
    }
  });

  fs.writeFile(lessonsFile, data, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
