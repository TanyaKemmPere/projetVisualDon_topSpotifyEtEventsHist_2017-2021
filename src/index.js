import css from "./css/main.css";

import * as d3 from 'd3';
import { json } from 'd3-fetch'

// set the dimensions and margins of the graph
const height = 300 //window.innerHeight*0.8;
const width = 300 //window.innerWidth*0.6;
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
            .append('p')
            .text('0')
        /*
        .append('svg')
        .attr('height', height)
        .attr('width', width)/** */

        let container = d3.select('article')

        for (let i = 0; i < randomSongs.length; i++) 
        {
            container.append('div')
                .attr('class', 'step')
                .attr('data-step', `${i + 1}`)
                .attr('data-danceability', randomSongs[i].danceability)
                .append('g')
                .attr('class', `step${i}`)
                .append('p')
                .text(`En ${data_events[i].month} ${data_events[i].year}, on écoutait`)

            d3.selectAll(`.step${i}`)
                .append('img')
                .attr('src', randomSongs[i].album.images[2].url)

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
                .attr('class', 'events')
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

        // initialize the scrollama
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
            sticky.querySelector("p").innerText = `d: ${el.dataset.danceability}`;
            //sticky.querySelector("rect").height = el.dataset.danceability*100;
        }

        function init()
        {
            scroller
                .setup({
                    step: ".scrolly article .step",
                    offset: 0.33,
                    debug: false })
                .onStepEnter(handleStepEnter);
                
            // setup resize event 
            window.addEventListener("resize", scroller.resize);
        }
        init()

        //console.log(scroller)


        





        /*
                container.selectAll('text')
                    .data(randomSongs)
                    .enter()
                    //créer un bloque blanc par musique qui englobe tout
                    .append('div')
                    .attr('class', 'item')
                    .append('g')
                    .attr('class', 'group')
                    //créer une div qui contient le nom de la chanson
                    .append('div')
                    .attr('class', 'songName')
                    .text(d=> d.name)
                    /*.append('div')
                    .attr('class', 'artist')
                    .text(d=> d.artists.map(a => ` ${a.name}`))
                    .append('img')
                    .attr('src', d=> d.album.images[2].url)
                    
                    .append("audio")
                    .attr('controls', 'controls')
                    .append('source')
                    .attr('src', d=> d.preview_url)
                    .attr('type', 'audio/mpeg')/** */

        /*
    let containerArtistes = d3.select('.group')
        //créer une div qui contient l'(es) artiste(s)
    containerArtistes.selectAll('text')
        .data(randomSongs)
        .enter()
        .append('div')
        .attr('class', 'artist')
        .text(d=> d.artists.map(a => ` ${a.name}`))
    
    
    //ajouter une image
    /*d3.selectAll('.item')
        .append('img')
        .attr('class', 'albumCover')
        .attr('src', 'https://robohash.org/image')
        .attr('alt', 'album cover')
        
        
        //créer le tableau avec les stats de la musique en question
        /*.append('div')
        .attr('class', 'svg')
        .append('svg')
        .attr('class', 'stats')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //créer rect
        /*.append('rect')
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.danceability); })
        .attr("height", function(d) { return height - y(d.danceability); })
        .attr("fill", "#69b3a2")/** */


        /*
                titre.selectAll('text')
                    .data(data_2017, d => d)
                    .join(
                    enter => enter
                        .append('text')
                        .attr('fill', 'green')
                        .attr('x', (d, i) => i*50)
                        .attr('y', -30)
                        .text(d => `${d.name}\r`)
                        .transition(t)
                        .attr('y', 0),
                    update => update
                        .attr('y', 0)
                        .transition(t)
                        .attr('x', (d, i) => i * 15),
                    exit => exit
                        .attr('fill', 'red')
                        .transition(t)
                        .attr("x", (d, i) => i * 15)
                    )
                
        
                /*
                // Parse the Data
        
                //axe X
                const x = d3.scaleBand()
                    .domain(data_2017.map(m => m.name))
                    .range([0, width])
                    .padding(0.2);
        
                svgGraphe.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))
                  
        
        
                //axe Y
                const y = d3.scaleLinear()
                    .domain([0, 1])
                    .range([ height, 0]);
        
        
                svgGraphe.append("g")
                    .attr("transform", `translate(${margin.left}, 0)`)
                    .call(d3.axisLeft(y));
        
        
                //bars
                svgGraphe.selectAll("rect")
                    .data(data_2017)
                    .enter()
                    .append("rect")
                    .attr("x", function(d) { return x(d.name); })
                    .attr("y", function(d) { return y(d.danceability); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.danceability); })
                    .attr("fill", "#69b3a2")
        
        
        
                
                /*data_2017.forEach(e => {
                    console.log(`${e.name} a comme tempo: ${e.tempo}`)
                }); /** */

        /*
        const musiques = data_2017.reduce((m, music) =>
        {
            const dance = m[music.danceability]
            return {}
        });*/
    })
    .catch(function (error) {
        console.log(error);
    }) /** */