const supabase = require("./supabaseClient");

async function getFloodHotspots() {

    const { data, error } = await supabase
        .from("flood_hotspots")
        .select("*");

    if (error) {
        throw error;
    }

    return data;
}

module.exports = getFloodHotspots;