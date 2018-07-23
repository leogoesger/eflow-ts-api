"use strict";

exports.setup = (options: any, seedLink: any) => {
    let dbm;
    let type;
    let seed;
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = (db: any) => {
    return db.createTable("Location", {
        description: "text",
        geoCode: "jsonb",
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: "int",
        },
        locationId: "int",
        name: "string",
        open: "boolean",
    });
};

exports.down = (db: any) => {
    return db.dropTable("Location");
};

exports._meta = {
    version: 1,
};