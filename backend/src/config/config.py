import sys

from dynaconf import Dynaconf
from loguru import logger

settings = Dynaconf(
    # Load environment variables prefixed with
    envvar_prefix='fittex',
    # Load settings files in order
    settings_files=['settings.toml', 'secrets.toml']
)


def configure_logs() -> None:
    """Configures the logging system for the order."""
    logger.remove()
    log_level = settings.logging.level
    log_path = settings.logging.path
    logger.add(sys.stderr, level=log_level)
    # If log is a path to a file, save them.
    if log_path:
        logger.add(log_path, level=log_level)
        logger.info('Saving logs in file. Path: {}.', log_path)
    logger.debug('Setting log level to: {}', log_level)
