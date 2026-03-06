import PocketBase from 'pocketbase';

const db = new PocketBase('https://agence.taverne-etudiante.fr/');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-create',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getAgents() {
    try {
        let data = await db.collection('agent').getFullList({
            sort: '-create',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        const data = await db.collection('agent').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant lagent', error);
        return null;
    }
}

export async function getMaisonByAgent(id) {
    try {
        const result = db.collection("maison").getFullList({
            filter: `agent = "${id}"`
        });
        return result;
    } catch (error) {
        console.log(`ERROR : ${error}`)
        return null;
    }
}


export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function bySurface(surface) {
    const records = await db.collection('maison').getFullList({ filter: `surface > ${surface}` });
    return records;
}

export async function byPrice(prix) {
    const records = await db.collection('maison').getFullList({ filter: `prix < ${prix}` });
    return records;
}

export async function byPriceBtwn(min, max) {
    const records = await db.collection('maison').getFullList({ filter: `prix < ${max} && prix > ${min}` });
    return records;
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export function filterPriceMinMax(min, max, records) {
    return records.filter((record) => record.prix > min && record.prix < max);
}

export async function addNewMaison(newMaison) {
    try {
        await db.collection('maison').create(newMaison);
        return {
            success: true,
            message: 'Maison ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function addNewAgent(newAgent) {
    try {
        await db.collection('agent').create(newAgent);
        return {
            success: true,
            message: 'Agent ajoutée avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en ajoutant l'agent`, error);
        return {
            success: false,
            message: `Une erreur est survenue en ajoutant l'agent`
        };
    }
}

export async function DeleteMaisonById(id) {
    try {
        await db.collection('maison').delete(id);
        return {
            success: true,
            message: 'Maison supprimée avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en supprimant la maison`, error);
        return {
            success: false,
            message: `Une erreur est survenue en supprimant la maison`
        };
    }
}

export async function DeleteAgentById(id) {
    try {
        await db.collection('agent').delete(id);
        return {
            success: true,
            message: 'Agent supprimée avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en supprimant l'agent`, error);
        return {
            success: false,
            message: `Une erreur est survenue en supprimant l'agent`
        };
    }
}

export async function updateMaisonById(id) {
    try {
        const data = {
            'nomMaison': 'test',
            'surface': 120,
            'favori': true
        }
        await db.collection('maison').update(id, data);
        return {
            success: true,
            message: 'Maison modifiée avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en modifiant la maison`, error);
        return {
            success: false,
            message: `Une erreur est survenue en modifiant la maison`
        };
    }
}

export async function superUserauth(login, mdp) {
    try {
        // console.log(await getOffres());
        await db.collection('_superusers').authWithPassword(`${login}`, `${mdp}`);
        // console.log(await getOffres());
        return {
            success: true,
            message: 'Connecté avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en se connectant`, error);
        return {
            success: false,
            message: `Une erreur est survenue en se connectant`
        };
    }
}

export async function userAdd(user) {
    try {
        await db.collection('users').create(user);
        return {
            success: true,
            message: 'Connecté avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en créant l'utilisateur`, error);
        return {
            success: false,
            message: `Une erreur est survenue en créant l'utilisateur`
        };
    }
}

const user1 = {
    'email': 'email1@gmail.com',
    'password': 'test1passwrd',
    'passwordConfirm': 'test1passwrd'

}
const user2 = {
    'email': 'email2@gmail.com',
    'password': 'test2passwrd',
    'passwordConfirm': 'test2passwrd'

}

// userAdd(user1);
// userAdd(user2);

export async function Userauth(login, mdp) {
    try {
        await db.collection('users').authWithPassword(login, mdp);
        return {
            success: true,
            message: 'Connecté avec succès'
        };
    } catch (error) {
        console.log(`Une erreur est survenue en se connectant`, error);
        return {
            success: false,
            message: `Une erreur est survenue en se connectant`
        };
    }
}

export async function setFavori(house) {
    await db.collection('maison').update(house.id, { favori: !house.favori });
}

// await Userauth('email2@gmail.com', 'test2passwrd');

// console.log(db.authStore.isValid);

// db.authStore.clear();
