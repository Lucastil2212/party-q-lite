import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('parties', table => {
        table.foreign('party_id').references('id').inTable('party');
        table.foreign('party_name').references('name').inTable('party');
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('parties');
}

