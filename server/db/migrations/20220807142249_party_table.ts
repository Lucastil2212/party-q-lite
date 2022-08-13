import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

    knex.schema.createTable('party', table => {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()')).notNullable();
        table.string('name').notNullable().notNullable();
        table.enu('type', ['remote', 'local'], { useNative: true, enumName: 'partyType' }).notNullable();
        table.foreign('host').references('id').inTable('user').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('party').raw('DROP TYPE partyType');
}

