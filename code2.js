
// Lista de endereços para obter coordenadas
const addresses = `

 //inseira os endereços aqui ...... para saber a latitude e longitude
















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