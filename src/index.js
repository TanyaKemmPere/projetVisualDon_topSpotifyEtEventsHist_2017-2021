import css from "./css/main.css";

import * as d3 from 'd3';
import { json } from 'd3-fetch'

// set the dimensions and margins of the graph
const height = 300 //window.innerHeight*0.8;
const width = 320 //window.innerWidth*0.6;
const margin = { top: 50, bottom: 50, left: 50, right: 50 }


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
        function pushSong(data) 
        {
            for (let i = 1; i <= 12; i++) 
            {
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

        let svgStats = d3.select('.scrolly')

        svgStats.append('div')
            .attr('class', 'sticky-thing')
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        let tableControl = svgStats.select('svg')
        
        //danceability
        tableControl.append('rect')
            .attr('class', 'hover')
            .attr('width', 10)
            .attr('height', 300)
            .attr('rx', 5)
            .attr('x', 5)
        tableControl.append('circle')
            .attr('class', 'danceability circle')
            .attr('r', 10)
            .style('fill', '#13f2f2')
            .attr('cx', 10)
            .attr('cy', 290)
            .append('animate')
            .attr('attributeName', 'd')
            .attr('dur', '5s')
            .attr('to', '')

        //energy
        tableControl.append('rect')
            .attr('class', 'hover')
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

        //bpm
        tableControl.append('rect')
            .attr('class', 'hover')
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

        //valence
        tableControl.append('rect')
            .attr('class', 'hover')
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
            /*
            .append('circle')
            .attr('r', 10)
            .style('fill', 'white')
            .attr('cx', 10)
            .attr('cy', 10)
            .append('animation')
            .attr('dur', '1s')
            .attr()/** */

        let container = d3.select('article')

        for (let i = 0; i < randomSongs.length; i++) 
        {
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

            /*d3.selectAll(`.step${i}`)
                .append('svg')
                .attr('height', height)
                .attr('width', width)
                .append('rect')
                .attr('height', randomSongs[i].danceability*100)
                .attr('width', 10)
                .attr('rx', 10)/** */
        }

        //sélectionner les différentes parties du scroll
        let main = document.querySelector("main");
        let scrolly = main.querySelector(".scrolly");
        let article = scrolly.querySelector("article");
        let steps = article.querySelectorAll(".step");
        let sticky = scrolly.querySelector(".sticky-thing");

        // initialize the scrollama, oh yeah baby
        let scroller = scrollama();

        // scrollama event handlers
        function handleStepEnter(response)
        {
            // response = { element, direction, index }
            var el = response.element;

            // remove is-active from all steps
            // then add is-active to this step
            steps.forEach(step => step.classList.remove('is-active'));
            el.classList.add('is-active');

            // update graphic based on step
            //sticky.querySelector("p").innerText = `d: ${el.dataset.danceability}`;
            sticky.querySelector(".danceability").setAttribute('cy', 300-el.dataset.danceability*300);
            sticky.querySelector(".energy").setAttribute('cy', 300-el.dataset.energy*300);
            sticky.querySelector(".bpm").setAttribute('cy', 300-el.dataset.bpm);
            sticky.querySelector(".valence").setAttribute('cy', 300-el.dataset.valence*300);
        }

        function init()
        {
            scroller
                .setup ({
                    step: ".scrolly article .step",
                    offset: 0.5,
                    debug: false})
                .onStepEnter(handleStepEnter);
                
            // setup resize event 
            window.addEventListener("resize", scroller.resize);
        }
        init()


        //////////TEST//////////

        let svgDanceability = d3.select('.test').append('g').attr('class', 'danceability');
        let svgEnergy = d3.select('.test').append('g').attr('class', 'energy');
        let svgTempo = d3.select('.test').append('g').attr('class', 'tempo');
        let svgLoudness = d3.select('.test').append('g').attr('class', 'valence');



        svgDanceability.append('p')
            .text('Danceability');

        let pWidth = document.querySelector('.danceability p').offsetWidth;
        
        svgDanceability.append('svg')
            .attr('width', pWidth)
            .attr('height', 20)
            .append('rect')
            .attr('height', '20px')
            .attr('ry', '10')
            .attr('width', pWidth*0.8)
            .attr('x', 0)

        svgDanceability.select('svg')
            .append('circle')
            .attr('r', 10)
            .attr('cy', 10)
            .attr('cx', 10)
            .style('fill', 'red')

        
        svgEnergy.append('p')
            .text('Energy')

        svgEnergy.append('svg')
            .attr('width', pWidth)
            .attr('height', 20)
            .append('rect')
            .attr('height', '20px')
            .attr('ry', '10')
            .attr('width', pWidth*0.8)
            .attr('x', pWidth*0.1)

        
        svgTempo.append('p')
            .text('BPM');

        svgTempo.append('svg')
            .attr('width', pWidth)
            .attr('height', 20)
            .append('rect')
            .attr('height', '20px')
            .attr('ry', '10')
            .attr('width', pWidth*0.8)
            .attr('x', pWidth*0.1)


        svgLoudness.append('p')
            .text('valence');

        svgLoudness.append('svg')
            .attr('width', pWidth)
            .attr('height', 20)
            .append('rect')
            .attr('height', '20px')
            .attr('ry', '10')
            .attr('width', pWidth*0.8)
            .attr('x', pWidth*0.1)
        /*
        let musique = d3.select('.test')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('class', 'testSvg');
        
        musique.append('rect')
            .attr('width', '250px')
            .attr('height', '10px')
            .attr('y', 10)
            .attr('x', 25)
            .style('fill', 'black')
            .attr('ry', '5')

        musique.append('rect')
            .attr('class', 'bar')
            .attr('width', '100px')
            .attr('height', 10)
            .attr('y', 30)

        musique.append('circle')
            .attr('r', '5px')
            .attr('cy', 15)
            .attr('cx', 20+25)
            .style('fill', 'red')
        
        
        //axe X
        /*const x = d3.scaleBand()
            .domain(randomSongs.map(n => n.name))
            .range([0, width])
            .padding(0.2);
        
        musique.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
              
    
        //axe Y
        const y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0]);


        musique.selectAll("rect")
            .data(randomSongs)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.danceability); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.danceability); })
            .attr("fill", "#69b3a2")/** */
    })
    .catch(function (error) {
        console.log(error);
    }) /** */