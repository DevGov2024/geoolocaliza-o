
// Lista de endereços para obter coordenadas
const addresses = `

Endereço	Latitude	Longitude
Rua DOUTOR MARIANO CURSINO DE MOURA 395 PARQUE MARIA LUIZA 03451-000 SAO PAULO SP
Rua DOUTOR MARIO DE SANCTIS 58 JARDIM ALMANARA 02863-020 SAO PAULO SP
Rua DOUTOR MEIRA PENA 33 VILA LOURDES 08410-080 SAO PAULO SP
Rua DOUTOR OVIDIO PIRES DE CAMPOS 342 CERQUEIRA CESAR 05403- 010 SAO PAULO SP
Rua DOUTOR PAULO CARVALHO FERREIRA 94 JARDIM SARAH 05382-040 SAO PAULO SP
Rua DOUTOR PAULO DE ANDRADE ARANTES 125 PARQUE MARIA LUIZA 03451-090 SAO PAULO SP
Rua DOUTOR PAULO QUEIROZ 955 JARDIM NOVE DE JULHO 03951-090 SAO PAULO SP
Rua DOUTOR PAULO RIBEIRO COELHO 115 JARDIM ESTER YOLANDA 05374-000 SAO PAULO SP
Rua DOUTOR PAULO QUEIROZ 987 JARDIM NOVE DE JULHO 03951-090 SAO PAULO SP
Rua DOUTOR RIBEIRO DE ALMEIDA 14 BARRA FUNDA 01137-020 SAO PAULO SP
Rua DOUTOR SAUL DE CAMARGO NEVES 66 VILA CONSTANCIA 03755- 100 SAO PAULO SP
Rua DOUTOR SIQUEIRA CAMPOS 176 LIBERDADE 01509-020 SAO PAULO SP
Rua DOUTOR VIRGILIO DE CARVALHO PINTO 519 PINHEIROS 05415-030 SAO PAULO SP
Rua DOUTOR VIRGILIO DE CARVALO PINTO 519 PINHEIROS 05415-030 SAO PAULO SP
Rua DOUTOR ZUQUIM 1070 SANTANA 02035-021 SAO PAULO SP
Rua ECAUNA 139 UMARIZAL 05754-040 SAO PAULO SP
Rua EDMUNDO ORIOLI 430 CIDADE TIRADENTES 08470-600 SAO PAULO SP
Rua EDMUNDO ORIOLI 85 CIDADE TIRADENTES 08470-600 SAO PAULO SP
Rua EDSON DANILLO DOTTO CONJUNTO HABITACIONAL SANTA ETELVINA II 08485-280 SAO PAULO SP
Rua EDUARDO COLLIER FILHO 14 CIDADE NOVA AMERICA 04897-360 SAO PAULO SP
Rua EDVARD CARMILO 670 JARDIM CELESTE 05528-001 SAO PAULO SP
Rua EDVARD CARMILO 840 JARDIM CELESTE 05528-001 SAO PAULO SP
Rua EDUARDO VICENTE NASSER 515 BARRO BRANCO 02344-050 SAO PAULO SP
Rua EDUARDO REUTER 410 CONJUNTO HABITACIONAL BARRO BRANCO II 08473-533 SAO PAULO SP
Rua EGIDIO FELINI 101 CONJUNTO RESIDENCIAL ELISIO TEIXEIRA LEITE 02815-040 SAO PAULO SP
Rua ELISA DINA 293 JARDIM BRITANIA 05269-060 SAO PAULO SP
Rua EGIDIO FELINI 81 CONJUNTO RESIDENCIAL ELISIO TEIXEIRA LEITE 02815-040 SAO PAULO SP
Rua ELISEU REINALDO MORAES VIEIRA 296 JARDIM BRASILIA 02858-000 SAO PAULO SP
Rua ELISIO FERREIRA 519 CIDADE SAO MATEUS 03964-010 SAO PAULO SP
Rua EMBAIXADOR ILDEFONSO FALCAO 157 CIDADE SAO MATEUS 03964- 020 SAO PAULO SP
Rua ELSA MORANTE 62 JARDIM SAO FRANCISCO 08390-324 SAO PAULO SP
Rua EMBIU 256 JARDIM SANTA MARIA 03574-110 SAO PAULO SP
Rua EMBIRATAI 201 JARDIM SANTA MARIA 03576-000 SAO PAULO SP
Rua ENCRUZILHADA DO SUL 1005 JARDIM PAULISTANO 02816-010 SAO PAULO SP
Rua EMILIO RETROSI JARDIM MARILU 08371-360 SAO PAULO SP
Rua ENCRUZILHADA DO SUL 220 JARDIM PAULISTANO 02816-010 SAO PAULO SP
Rua ENEIAS LUIS CARLOS BARBANTI 660 VILA ARCADIA 02911-000 SAO PAULO SP
Rua ENGENHEIRO CARLO GRAZIA 120 CIDADE TIRADENTES 08475-410 SAO PAULO SP
Rua ENGENHEIRO GUARACY TORRES 1253 JARDIM SHANGRILA 04852- 000 SAO PAULO SP
















`.trim().split("\n");

// Ordena os endereços em ordem alfabética
addresses.sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));

// Função para executar as requisições com intervalo
async function processAddressesWithDelay(addresses, delay = 1000) {
    for (const address of addresses) {
        await new Promise(resolve => setTimeout(resolve, delay)); // Aguarda o intervalo
        await getCoordinates(address); // Chama a função de requisição
    }
}

// Função para buscar coordenadas
async function getCoordinates(address) {
    const apiKey = "1vtROKFc2enpts4FBQopLjo8ghkWL3yivBt-K6vLHdo";
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items.length > 0) {
            const location = data.items[0].position;
            console.log(`${location.lat}, ${location.lng}`);
            
            // Adiciona as coordenadas à tabela
            addCoordinatesToTable(address, location.lat, location.lng);
        } else {
            console.log(`Endereço não encontrado: ${address}`);
            addCoordinatesToTable(address, "N/A", "N/A");
        }
    } catch (error) {
        console.error(`Erro ao buscar coordenadas para o endereço ${address}:`, error);
        addCoordinatesToTable(address, "Erro", "Erro");
    }
}

// Função para adicionar as coordenadas na tabela HTML
function addCoordinatesToTable(address, lat, lng) {
    const tableBody = document.querySelector("#coordinates-table tbody");
    const newRow = document.createElement("tr");

    // Criação das células para o endereço e coordenadas
    const addressCell = document.createElement("td");
    addressCell.textContent = address;
    const latCell = document.createElement("td");
    latCell.textContent = lat;
    const lngCell = document.createElement("td");
    lngCell.textContent = lng;

    // Adiciona as células à linha
    newRow.appendChild(addressCell);
    newRow.appendChild(latCell);
    newRow.appendChild(lngCell);

    // Adiciona a linha à tabela
    tableBody.appendChild(newRow);
}

// Executa o processamento com um intervalo de 1 segundo (1000ms) entre as requisições
processAddressesWithDelay(addresses, 1000);