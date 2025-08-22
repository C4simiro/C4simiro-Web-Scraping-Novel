Primeiramente, meu objetivo nunca foi causar danos ou prejudicar ninguém. Criei esta ferramenta porque queria ler uma história que estava disponível apenas em pedaços na internet e, então, decidi juntar esses pedaços em um único arquivo para facilitar a leitura no meu Kindle.

Este projeto começou como uma ferramenta pessoal para automatizar uma tarefa que levaria dias para ser feita manualmente. Meu objetivo era simplesmente consolidar uma história fragmentada em um único arquivo, mas no decorrer do processo, o projeto se transformou em uma jornada de aprendizado sobre desenvolvimento de software robusto e escalável.

O script atual automatiza o processo de extração de conteúdo textual de múltiplas páginas web, converte cada página em um arquivo PDF individual e, por fim, une todos os PDFs em um único documento.

Primeiramente pensei em algo que pudesse fazer algo rápido e pratico: Pagina na web: Entrar > Ler > Buscar > Fazer o download do arquivo > Repetir o processo ate todos os arquivos fossem baixados > juntar todos os arquivos em um só.

No decorrer do processo tive vários problemas e erros que precisei pesquisar bastante para resolver.

Principais desafios resolvidos:

- O site não usava uma navegação padrão. A simples ação de clicar em um botão de "próximo capítulo" era complexa, pois o botão era um elemento dinâmico que só aparecia após o carregamento assíncrono da página. O script, por sua vez, era interrompido ao tentar buscar por uma opção de navegação que ainda não existia. Entao ao em vez de tentar encontrar elementos visuais (como botões), a solução foi gerar as URLs de forma programática utilizando template strings. Um loop foi criado para iterar de 1 até o número total de capítulos, e uma template string construía o link exato para cada página. Essa abordagem tornou o script imune a mudanças na interface do site, garantindo a execucao do script.

- Outro desafio foi a instabilidade de rede e timeouts do servidor. Esse simples erro de conexão feito ou não de proposito pelo servido fazia com que o script parasse de executar. A solução foi utilizar um Loop que percorre cada URL na lista gerada com um timeout de 1min.

- O proximo problema estava na quantidade de dados gerados, tendo em vista que o conteúdo resultaa em mais de mil arquivos PDF separados, isso não deixaria a leitura dinâmica. Para resolver isso, criei um script secundário dedicado a manipulação de arquivos, esse script organiza todos os arquivos em ordem numérica e em seguida une as paginas em um único arquivo.


Próximos passos e evolução:

Este projeto começou com um objetivo simples, mas a intenção é transformá-lo em algo maior. A ideia é evoluir este script engessado, projetado para um único site, em uma ferramenta genérica e escalável, com uma usabilidade que possa servir para outros fins.

Ainda estou decidindo os próximos passos, mas continuarei aprimorando o projeto para que ele se torne um algo cada vez mais valioso.

Se você chegou até aqui, obrigado! Sou uma pessoa em busca de uma oportunidade para entrar no mercado de desenvolvimento. Caso queira ajudar de alguma forma, sinta-se à vontade para entrar em contato.
