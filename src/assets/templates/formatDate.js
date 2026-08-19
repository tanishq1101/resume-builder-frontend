export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const value = String(dateStr);
    if (value.toLowerCase() === "present" || !value.includes("-")) {
        return value;
    }
    const [year, month] = value.split("-");
    const parsedDate = new Date(Number(year), Number(month) - 1);
    if (isNaN(parsedDate.getTime())) {
        return value;
    }
    return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short"
    });
};
