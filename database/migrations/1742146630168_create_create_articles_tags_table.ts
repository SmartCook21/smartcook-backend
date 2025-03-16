import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles_tags'

  async up() {
    this.schema.createTable('articles_tags', (table) => {
      table.increments('id')
      table.integer('article_id').unsigned().references('articles.id').onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
