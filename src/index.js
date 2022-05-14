import css from "./css/main.css";

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import * as animation from './/objets/animation.js'
import { utcParse } from "d3";

// set the dimensions and margins of the graph
const height = 300 //window.innerHeight*0.8;
const width = 320 //window.innerWidth*0.6;

//créer les petites box qui survolent

let tooltipDanceE = d3.select('.graphQuiBouge')
    .append('div')
    .attr('class', 'box')
    .style('position', 'absolute')
    .style('top', '120px')
    .style('left', '185px')
    .style('visibility', 'hidden')
    .text('dance');

let tooltipEnergyE = d3.select('.graphQuiBouge')
    .append('div')
    .attr('class', 'box')
    .style('position', 'absolute')
    .style('top', '120px')
    .style('left', '280px')
    .style('visibility', 'hidden')
    .text('energy');

let tooltipTempoE = d3.select('.graphQuiBouge')
    .append('div')
    .attr('class', 'box')
    .style('position', 'absolute')
    .style('top', '120px')
    .style('left', '390px')
    .style('visibility', 'hidden')
    .text('BPM');

let tooltipValenceE = d3.select('.graphQuiBouge')
    .append('div')
    .attr('class', 'box')
    .style('position', 'absolute')
    .style('top', '120px')
    .style('left', '470px')
    .style('visibility', 'hidden')
    .text('happiness');

//créer le graphe d'exemple

let svgQuiBouge = d3.select('.graphQuiBouge')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .on("click", function () {
        updateAll()
    })

svgQuiBouge.append('rect')
    .attr('class', 'toolDanceabilityE')
    .attr('width', 10)
    .attr('height', 300)
    .attr('rx', 5)
    .attr('x', 5)
d3.select('.toolDanceabilityE')
    .on('mouseover', function () { return tooltipDanceE.style('visibility', 'visible'); })
    .on("mouseout", function () { return tooltipDanceE.style("visibility", "hidden"); });

svgQuiBouge.append('rect')
    .attr('class', 'hover toolEnergyE')
    .attr('width', 10)
    .attr('height', 300)
    .attr('rx', 5)
    .attr('x', 105)
d3.select('.toolEnergyE')
    .on('mouseover', function () { return tooltipEnergyE.style('visibility', 'visible'); })
    .on("mouseout", function () { return tooltipEnergyE.style("visibility", "hidden"); });

svgQuiBouge.append('rect')
    .attr('class', 'hover toolBpmE')
    .attr('width', 10)
    .attr('height', 300)
    .attr('rx', 5)
    .attr('x', 205)
d3.select('.toolBpmE')
    .on('mouseover', function () { return tooltipTempoE.style('visibility', 'visible'); })
    .on("mouseout", function () { return tooltipTempoE.style("visibility", "hidden"); });

svgQuiBouge.append('rect')
    .attr('class', 'hover toolValenceE')
    .attr('width', 10)
    .attr('height', 300)
    .attr('rx', 5)
    .attr('x', 305)
d3.select('.toolValenceE')
    .on('mouseover', function () { return tooltipValenceE.style('visibility', 'visible'); })
    .on("mouseout", function () { return tooltipValenceE.style("visibility", "hidden"); });

let dataFict = [];

function updateData() {
    dataFict = [];
    for (let i = 0; i < 4; i++) {
        dataFict.push(Math.floor((Math.random() * 300) + 1));
    }
}

function update() {
    svgQuiBouge.selectAll('circle')
        .data(dataFict)
        .join('circle')
        .attr('cx', (d, i) => i * 100 + 10)
        .attr('r', 10)
        .attr('fill', '#13f2f2')
        .transition()
        .attr('cy', function (d) {
            return d;
        });
}

function updateAll() {
    updateData();
    update();
}

updateAll();





Promise.all([
    json('../data-2017.json'),
    json('../data-2018.json'),
    json('../data-2019.json'),
    json('../data-2020.json'),
    json('../data-2021.json'),
    json('../events.json')
])
    //d3.json('../data-2017.json')
    .then(([data_2017, data_2018, data_2019, data_2020, data_2021, data_events]) => {

        //avec les 12'000 (=200*12*5) chansons que nous avons, on crée
        //un tableau avec 1 chanson aléatoire par mois, de sorte que
        //chaque fois que la page est relancée il y a d'autres
        //chansons qui apparaissent

        //créer le tableau qui va contenir nos 60 chansons (=5*12)
        let randomSongs = [];

        //une fonction pour pousser les chansons sélectionnées au
        //hasard dans ce tableau
        function pushSong(data) {
            for (let i = 1; i <= 12; i++) {
                let x = Math.floor((Math.random() * 200) + 200 * (i - 1));
                randomSongs.push(data[x])
            }
        }

        //l'utiliser pour chaque fichier où il y a nos chansons
        pushSong(data_2017);
        pushSong(data_2018);
        pushSong(data_2019);
        pushSong(data_2020);
        pushSong(data_2021);

////////////////////////////////////////////////////////
        //mise en place du carré de droite, avec tous ses
        //éléments à l'intérieur: les rectangles, les box hover
        let svgStats = d3.select('section.scrolly')

        svgStats.append('div')
            .attr('class', 'sticky-thing')
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        let tooltipDance = svgStats.select('.sticky-thing')
            .append('div')
            .attr('class', 'box')
            .style('position', 'absolute')
            .style('top', '120px')
            .style('left', '185px')
            .style('visibility', 'hidden')
            .text('dance');

        let tooltipEnergy = svgStats.select('.sticky-thing')
            .append('div')
            .attr('class', 'box')
            .style('position', 'absolute')
            .style('top', '120px')
            .style('left', '280px')
            .style('visibility', 'hidden')
            .text('energy');

        let tooltipTempo = svgStats.select('.sticky-thing')
            .append('div')
            .attr('class', 'box')
            .style('position', 'absolute')
            .style('top', '120px')
            .style('left', '390px')
            .style('visibility', 'hidden')
            .text('BPM');

        let tooltipValence = svgStats.select('.sticky-thing')
            .append('div')
            .attr('class', 'box')
            .style('position', 'absolute')
            .style('top', '120px')
            .style('left', '470px')
            .style('visibility', 'hidden')
            .text('happiness');

        let tableControl = svgStats.select('svg')

        //danceability
        tableControl.append('rect')
            .attr('class', 'hover toolDanceability')
            .attr('width', 10)
            .attr('height', 300)
            .attr('rx', 5)
            .attr('x', 5)
        tableControl.append('circle')
            .attr('class', 'circle danceability')
            .attr('r', 10)
            .style('fill', '#13f2f2')
            .attr('cx', 10)
            .attr('cy', 290)
        //hover
        d3.select('.toolDanceability')
            .on('mouseover', function () { return tooltipDance.style('visibility', 'visible'); })
            .on("mouseout", function () { return tooltipDance.style("visibility", "hidden"); });


        //energy
        tableControl.append('rect')
            .attr('class', 'hover toolEnergy')
            .attr('width', 10)
            .attr('height', 300)
            .attr('rx', 5)
            .attr('x', 105)
        tableControl.append('circle')
            .attr('class', 'energy circle')
            .attr('r', 10)
            .style('fill', '#13f2f2')
            .attr('cx', 110)
            .attr('cy', 290)
        d3.select('.toolEnergy')
            .on('mouseover', function () { return tooltipEnergy.style('visibility', 'visible'); })
            .on("mouseout", function () { return tooltipEnergy.style("visibility", "hidden"); });

        //bpm
        tableControl.append('rect')
            .attr('class', 'hover toolBpm')
            .attr('width', 10)
            .attr('height', 300)
            .attr('rx', 5)
            .attr('x', 205)
        tableControl.append('circle')
            .attr('class', 'bpm circle')
            .attr('r', 10)
            .style('fill', '#13f2f2')
            .attr('cx', 210)
            .attr('cy', 290)
        d3.select('.toolBpm')
            .on('mouseover', function () { return tooltipTempo.style('visibility', 'visible'); })
            .on("mouseout", function () { return tooltipTempo.style("visibility", "hidden"); });

        //valence
        tableControl.append('rect')
            .attr('class', 'hover toolValence')
            .attr('width', 10)
            .attr('height', 300)
            .attr('rx', 5)
            .attr('x', 305)
        tableControl.append('circle')
            .attr('class', 'valence circle')
            .attr('r', 10)
            .style('fill', '#13f2f2')
            .attr('cx', 310)
            .attr('cy', 290)
        d3.select('.toolValence')
            .on('mouseover', function () { return tooltipValence.style('visibility', 'visible'); })
            .on("mouseout", function () { return tooltipValence.style("visibility", "hidden"); });

///////////////////////////////////////////////////
        //creation des carrés qui défilent à gauche
        let container = d3.select('section.scrolly article')

        for (let i = 0; i < randomSongs.length; i++) {
            container.append('div')
                .attr('class', 'step')
                .attr('data-step', `${i + 1}`)
                .attr('data-danceability', randomSongs[i].danceability)
                .attr('data-energy', randomSongs[i].energy)
                .attr('data-bpm', randomSongs[i].tempo)
                .attr('data-valence', randomSongs[i].valence)
                .append('g')
                .attr('class', `step${i}`)
                .append('p')
                .text(`En ${data_events[i].month} ${data_events[i].year}, on écoutait`)

            d3.selectAll(`.step${i}`)
                .append('div')
                .append('img')
                .attr('class', 'album')
                .attr('src', randomSongs[i].album.images[0].url)

            d3.selectAll(`.step${i}`)
                .append('div')
                .attr('class', 'songName')
                .text(randomSongs[i].name)

            d3.selectAll(`.step${i}`)
                .append('div')
                .attr('class', 'artist')
                .text(randomSongs[i].artists.map(a => ` ${a.name}`))

            d3.selectAll(`.step${i}`)
                .append('div')
                .attr('class', 'event')
                .text(data_events[i].event)

            d3.selectAll(`.step${i}`)
                .append('audio')
                .attr('controls', 'controls')
                .append('source')
                .attr('src', randomSongs[i].preview_url)
                .attr('type', 'audio/mpeg')
            /** */
        }
///////////////////////////////////////////////////////
        //sélectionner les différentes parties du scroll
        let main = document.querySelector("main");
        let scrolly = main.querySelector("section.scrolly");
        let article = scrolly.querySelector("section.scrolly article");
        let steps = article.querySelectorAll(".step");
        let sticky = scrolly.querySelector(".sticky-thing");

/////////////////////////////////////////////////
        //c'est la que la magie s'oppère
        // initialize the scrollama, oh yeah baby
        let scroller = scrollama();

        // scrollama event handlers
        function handleStepEnter(response) {
            // response = { element, direction, index }
            var el = response.element;

            // remove is-active from all steps
            // then add is-active to this step
            steps.forEach(step => step.classList.remove('is-active'));
            el.classList.add('is-active');

            // update graphic based on step
            //sticky.querySelector("p").innerText = `d: ${el.dataset.danceability}`;
            d3.select('.circle.danceability')   
                .transition()
                .duration(500)
                .attr('cy', 300 - el.dataset.danceability * 300)
            d3.select('.circle.energy')   
                .transition()
                .duration(500)
                .attr('cy', 300 - el.dataset.energy * 300)
            d3.select('.circle.bpm')   
                .transition()
                .duration(500)
                .attr('cy', 300 - el.dataset.bpm)
            d3.select('.circle.valence')   
                .transition()
                .duration(500)
                .attr('cy', 300 - el.dataset.valence * 300)
        }

        function init() {
            scroller
                .setup({
                    step: "section.scrolly article .step",
                    offset: 0.5,
                    debug: false
                })
                .onStepEnter(handleStepEnter);

            // setup resize event 
            window.addEventListener("resize", scroller.resize);
        }
        init()

    })
    .catch(function (error) {
        console.log(error);
    }) /** */