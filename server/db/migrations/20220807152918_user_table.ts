import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('user', table => {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()')).notNullable();
        table.string('spotifyId').notNullable();
        table.string('name').notNullable();
        table.json('songList').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('user');
}

