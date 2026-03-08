export default async function handler(req, res) {
    const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE_NAME = "Arreglos"; // Make sure this matches your Airtable table name

    if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
        return res.status(500).json({ error: "Missing Airtable environment variables" });
    }

    try {
        const response = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
            {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_PAT}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();

        // Transform Airtable format to the cleaner format we used in products.json
        const products = data.records.map((record) => {
            const fields = record.fields;
            return {
                id: record.id,
                name: fields.Nombre || "Sin nombre",
                description: fields.Descripcion || "",
                price: fields.Precio || "$0.00",
                category: fields.Categoria || "otros",
                // First Priority: Attachment field (ImagenArchivo)
                // Second Priority: URL field (ImagenURL)
                // Fallback: Placeholder
                image: (Array.isArray(fields.ImagenArchivo) && fields.ImagenArchivo.length > 0)
                    ? fields.ImagenArchivo[0].url
                    : (fields.ImagenURL || "assets/placeholder.png"),
                alt: fields.Nombre || "Imagen de arreglo floral"
            };
        });

        // Set cache headers for better performance (1 minute for now to allow testing)
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        return res.status(200).json(products);
    } catch (error) {
        console.error("Airtable fetch error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
