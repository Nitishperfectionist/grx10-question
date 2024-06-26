// Question 1

//**Find the name and capital of all countries with a population greater than 100 million.**

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const result = countries
            .filter(({ population }) => population > 100000000)
            .map(({ name: { common }, capital }) => ({
                name: common,
                capital: capital ? capital[0] : 'No Capital'
            }));
        // console.log(result);
    });


//q2
//List the names of countries that are located in the region of 'Europe'.

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const result = countries
            .filter(({ region }) => region === 'Europe')
            .map(({ name: { common } }) => common);
        // console.log(result);
    });


    //Q3
    //Find the total population of all countries in 'Africa'.
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const totalPopulation = countries
            .filter(({ region }) => region === 'Africa')
            .reduce((sum, { population }) => sum + population, 0);
        // console.log(totalPopulation);
    });


    //Q4
    //Get the names and areas of the 5 largest countries by area.

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const result = countries
            .sort((a, b) => b.area - a.area)
            .slice(0, 5)
            .map(({ name: { common }, area }) => ({
                name: common,
                area
            }));
        // console.log(result);
    });

    //Q5
    //List the names of countries that have 'landlocked' status

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const result = countries
            .filter(({ landlocked }) => landlocked)
            .map(({ name: { common } }) => common);
        // console.log(result);
    });
//Q6
//Group countries by region and find the total population of landlocked countries in each region.
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const landlockedPopulationByRegion = countries
            .filter(({ landlocked }) => landlocked)
            .reduce((acc, { region, population }) => {
                acc[region] = (acc[region] || 0) + population;
                return acc;
            }, {});
        console.log(landlockedPopulationByRegion);
    });

//Q7
//Group countries by region and find the average population of landlocked countries in each region.
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const groupedByRegion = countries
            .filter(({ landlocked }) => landlocked)
            .reduce((acc, { region, population }) => {
                if (!acc[region]) {
                    acc[region] = { totalPopulation: 0, count: 0 };
                }
                acc[region].totalPopulation += population;
                acc[region].count += 1;
                return acc;
            }, {});

        const averagePopulationByRegion = Object.keys(groupedByRegion)
            .reduce((acc, region) => {
                acc[region] = groupedByRegion[region].totalPopulation / groupedByRegion[region].count;
                return acc;
            }, {});

        console.log(averagePopulationByRegion);
    });


    //Q8
    //Group countries by region and list the names and populations of landlocked countries with a population greater than a specified threshold \( x \).
    const populationThreshold = 5000000;

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const regions = countries.reduce((acc, { region, population, landlocked, name: { common } }) => {
            if (!acc[region]) {
                acc[region] = [];
            }
            if (landlocked && population > populationThreshold) {
                acc[region].push({ name: common, population });
            }
            return acc;
        }, {});

        console.log(regions);
    });
