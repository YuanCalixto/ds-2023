CREATE TABLE tb_todo (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    completed BOOLEAN,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES tb_user(id),
    tag_id UUID REFERENCES tb_tag(id)
);
