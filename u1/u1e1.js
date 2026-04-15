// T5. Técnicas para mejorar la estructura y robustez de código
// U1. Gestión de errores y excepciones
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
class InventoryManager {
    #productList;

    constructor() {
        this.#productList = [];
    }

    init(products) {
        const errors = [];
        products.forEach(element => {
            let resultat = this.addProduct(element);
            if (!resultat.status) {
                errors.push(resultat.message);
            }    
        });
        if (errors.length > 0) {
            return errors;
        }
        return true;
    }

    nProducts() {
        return this.#productList.length;
    }

    addProduct(product) {
        let result = false;
        let missatge = `INVENTORY_ADD. El producte (${product.code}) ha estat afegit amb èxit a l'inventari.`
        try {
            result = this.validateProduct(product);
            this.#productList.push(product);
        } catch (error) {
            missatge = error.message;
        } finally {
            return {status: result, message: missatge};
        }
    }

    validateProduct(product) {
        const code = product.code
        if (!this.#isValidFormat(product)) {
            throw new Error(`ERROR_DATA. Alguna de les dades del producte (${code}) no té un format vàlid.`)
        }
        if (!this.#isValidCode(code)) {
            throw new Error(`INVENTORY_CODE. Ja existeix un altre producte amb aquest codi (${code}).`)
        }
        if (!this.#isValidName(product.name)) {
            throw new Error(`INVENTORY_NAME. El nom del producte (${code}) ja existeix.`)
        }
        if (!this.#isValidPrice(product.price)) {
            throw new Error(`INVENTORY_PRICE. El preu del producte (${code}) no pot ser inferior a 50.`)
        }
        if (!this.#isValidDiscount(product.discount)) {
            throw new Error(`INVENTORY_DISCOUNT. El descompte del producte (${code}) ha d'estar entre 0 i 10.`)
        }
        if (!this.#isValidAmount(product.amount)) {
            throw new Error(`INVENTORY_AMOUNT. La quantitat de producte (${code}) no pot ser inferior a 10.`)
        }
        return true;
    }

    #isValidFormat(product) {
        if (!(typeof product.code === 'number' 
            && Number.isInteger(product.code) 
            && product.code >= 0)) {
            return false;
        }
        if (!(typeof product.discount === 'number' 
            && Number.isInteger(product.discount) 
            && product.discount >= 0)) {
            return false;
        }
        if (!(typeof product.amount === 'number' 
            && Number.isInteger(product.amount) 
            && product.amount >= 0)) {
            return false;
        }
        if (!(typeof product.name === 'string' 
            && product.name.trim().length > 0)) {
            return false;
        }
        const twoDecimals = /^(?:\d+)(?:\.\d{1,2})?$/.test(String(product.price));
        if (!(typeof product.price === "number" 
            && product.price > 0 
            && Number.isFinite(product.price) 
            && twoDecimals)) {
            return false;
        }
        return true;
    }

    #isValidCode(code) {
        if (this.#productList.some(p => p.code === code)) {
            return false;
        }
        return true;
    }

    #isValidName(name) {
        if (this.#productList.some(p => p.name === name)) {
            return false;
        }
        return true;
    }

    #isValidPrice(price) {
        if (!(price > 50)) {
            return false;
        }
        return true;
    }

    #isValidDiscount(discount) {
        if (!(discount >= 0 && discount <= 10)) {
            return false;
        }
        return true;
    }

    #isValidAmount(amount) {
        if (!(amount >= 10)) {
            return false;
        }
        return true;
    }
}


export {InventoryManager};
