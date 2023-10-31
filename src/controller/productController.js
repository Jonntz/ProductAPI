const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto (Product).
 *     parameters:
 *       - in: body
 *         name: produto
 *         description: Dados do produto a ser criado
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *               description: Nome do produto
 *             Price:
 *               type: float
 *               description: Preço do produto
 *             Description:
 *               type: string
 *               description: Descrição do produto
 *           example:
 *             Name: Teclado
 *             Price: 12.50
 *             Description: Teclado gamer
 *     responses:
 *       201:
 *         description: Produto criada com sucesso
 *         
 *       400:
 *         description: Erro no corpo da requisição
 */
const createProduct = async (req, res) => {
    try {
        const { Name, Price, Description } = req.body;
        const product = await prisma.product.create({
            data: {
                Name,
                Price,
                Description
            },
        });
        return res.json(product);
    } catch (error) {
        return res.status(400).send(`Erro no corpo da requisição`);
    }
};


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     responses:
 *       200:
 *         description: Produtos encontrado com sucesso
 *         
 *       500:
 *         description: Erro no servidor
 * 
 */
const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ error: 'Erro do servidor' });
    }
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID do produto a ser retornado
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 * 
 */
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        } else {
            return res.json(product);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Erro do servidor' });
    }
};



/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto (Product).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID do produto a ser retornado
 * 
 *       - in: body
 *         name: produto
 *         description: Dados do produto a ser atualizado
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *               description: Nome do produto
 *             Price:
 *               type: float
 *               description: Preço do produto
 *             Description:
 *               type: string
 *               description: Descrição do produto
 *     responses:
 *       201:
 *         description: Produto criada com sucesso
 *       400:
 *         description: Erro no corpo da requisição
 *       404:
 *         description: Produto não encontrado
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Price, Description } = req.body;
        const updatedproduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                Name,
                Price,
                Description
            },
        });
        return res.json(updatedproduct);
    } catch (error) {
        if (error.meta) {
            return res.status(404).send('Produto não encontrado')
        } else {

            return res.status(400).send('Erro no corpo da requisição')
        }
    }
};


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Exclui um produto (Product).
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Dados do produto a ser excluido
 *         required: true
 *         
 *     responses:
 *       201:
 *         description: Produto excluido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        return res.json({ message: 'Produto excluido com sucesso' });
    } catch (erro) {
        return res.status(404).send('Produto não encontrado')
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
